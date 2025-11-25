#!/usr/bin/env python3
"""
Data Brain (Python): computes recommendations from platform JSON exports.
- Input: JSON via stdin (single object) or file paths via argv. See INPUT_SCHEMA below.
- Output: JSON to stdout matching OUTPUT_SCHEMA below.

Constraints: Python 3.10+/3.11, libs: pandas, numpy, scikit-learn, python-dateutil
"""

import sys
import json
import math
import argparse
from datetime import datetime
from collections import defaultdict, Counter

# Optional deps: gracefully degrade if not installed
try:
    from dateutil import parser as dtparser  # type: ignore
except Exception:  # pragma: no cover
    dtparser = None

try:
    import numpy as np  # type: ignore
except Exception:  # pragma: no cover
    np = None

try:
    import pandas as pd  # type: ignore
except Exception:  # pragma: no cover
    pd = None

try:
    from sklearn.cluster import KMeans  # type: ignore
except Exception:  # pragma: no cover
    KMeans = None

INPUT_SCHEMA = {
    "platforms": {
        # platform_name: list[records]
        # record keys (best-effort): views, likes, comments, shares, postedAt (ISO), title/message/text, durationSec
    }
}

# ---- Utilities ----

def safe_dt(s):
    if not s:
        return None
    # Prefer dateutil if available for robustness
    if dtparser is not None:
        try:
            return dtparser.parse(s)
        except Exception:
            pass
    # Fallback: basic ISO parsing
    try:
        # Handle common cases "YYYY-MM-DD" or ISO strings
        return datetime.fromisoformat(str(s).replace("Z", "+00:00"))
    except Exception:
        return None


def engagement_rate(row):
    v = max(float(row.get("views") or 0), 1.0)
    l = float(row.get("likes") or 0)
    c = float(row.get("comments") or 0)
    return (l + c) / v


def build_df(platform, records):
    """Return a uniform list of dicts with computed fields.
    If pandas is available, keep a DataFrame path; else, return list.
    """
    if pd is not None:
        if not records:
            return pd.DataFrame()
        df = pd.DataFrame.from_records(records)
        if "postedAt" in df.columns:
            df["_dt"] = df["postedAt"].apply(safe_dt)
        else:
            df["_dt"] = None
        for col in ["views", "likes", "comments", "shares", "durationSec"]:
            if col not in df.columns:
                df[col] = 0
            df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0)
        df["er"] = df.apply(engagement_rate, axis=1)
        df["platform"] = platform
        return df
    # Fallback without pandas
    norm = []
    for r in records or []:
        v = float(r.get("views") or 0)
        l = float(r.get("likes") or 0)
        c = float(r.get("comments") or 0)
        er = (l + c) / (v if v > 0 else 1.0)
        norm.append({
            "platform": platform,
            "_dt": safe_dt(r.get("postedAt")),
            "views": v,
            "likes": l,
            "comments": c,
            "shares": float(r.get("shares") or 0),
            "durationSec": float(r.get("durationSec") or 0),
            "title": r.get("title") or r.get("message") or "",
            "er": er,
        })
    return norm


# ---- Posting Schedule ----

def compute_posting_schedule(df):
    """Return top (weekday, hour) bins per platform using engagement rate as utility.
    Fallback to views if ER is degenerate.
    """
    results = {}
    # Pandas path
    if pd is not None and isinstance(df, pd.DataFrame):
        groups = df.groupby("platform")
    else:
        # Build groups from list
        groups = {}
        for r in df:
            groups.setdefault(r["platform"], []).append(r)

    for platform, pdf in (groups.items() if isinstance(groups, dict) else groups):
        if pd is not None and isinstance(df, pd.DataFrame):
            has_time = pdf["_dt"].notna().any()
        else:
            has_time = any(r.get("_dt") for r in pdf)
        if not has_time or len(pdf) < 3:
            results[platform] = {
                "recommendations": [],
                "note": "Insufficient timestamps; unable to infer schedule",
            }
            continue
        if pd is not None and isinstance(df, pd.DataFrame):
            tmp = pdf[pdf["_dt"].notna()].copy()
            tmp["weekday"] = tmp["_dt"].dt.weekday
            tmp["hour"] = tmp["_dt"].dt.hour
            metric = "er"
            if tmp["er"].sum() == 0:
                metric = "views"
            agg = tmp.groupby(["weekday", "hour"])[metric].mean().reset_index()
            top = agg.sort_values(metric, ascending=False).head(6)
            iter_rows = [(int(r["weekday"]), int(r["hour"]), float(r[metric])) for _, r in top.iterrows()]
        else:
            # Pure Python aggregation
            buckets = {}
            total_er = sum(r["er"] for r in pdf)
            metric_key = "er" if total_er > 0 else "views"
            for r in pdf:
                if not r.get("_dt"):
                    continue
                wd = r["_dt"].weekday(); hr = r["_dt"].hour
                key = (wd, hr)
                acc = buckets.setdefault(key, {"sum": 0.0, "n": 0})
                acc["sum"] += float(r[metric_key])
                acc["n"] += 1
            means = [ (wd, hr, v["sum"] / max(v["n"],1)) for (wd,hr), v in buckets.items() ]
            iter_rows = sorted(means, key=lambda x: x[2], reverse=True)[:6]
        # Merge adjacent hours into windows
        # Simple windowing: group by weekday and take top 3 hours; convert to ranges of 2 hours
        recs = []
        for wd, hr, score in iter_rows:
            window = {
                "weekday": wd,
                "hourStart": hr,
                "hourEnd": (hr + 2) % 24,
                "score": score,
                "metric": "er",
            }
            recs.append(window)
        # Deduplicate by overlapping hours
        dedup = []
        seen = set()
        for r in recs:
            key = (r["weekday"], r["hourStart"])  # coarse
            if key in seen:
                continue
            seen.add(key)
            dedup.append(r)
        results[platform] = {
            "recommendations": dedup[:3],
            "note": f"Based on mean {metric} by weekday/hour",
        }
    return results


# ---- Platform Focus ----

def compute_platform_focus(df):
    results = []
    now = datetime.utcnow()
    # Prepare grouping
    if pd is not None and isinstance(df, pd.DataFrame):
        items = df.groupby("platform")
    else:
        groups = {}
        for r in df:
            groups.setdefault(r["platform"], []).append(r)
        items = groups.items()
    for platform, pdf in items:
        if (pd is not None and isinstance(df, pd.DataFrame) and pdf.empty) or (isinstance(pdf, list) and len(pdf)==0):
            continue
        # recent vs previous 30 days
        if pd is not None and isinstance(df, pd.DataFrame):
            if pdf["_dt"].notna().any():
                recent_cut = now - (pd.Timedelta(days=30))
                prev_cut = now - (pd.Timedelta(days=60))
                recent = pdf[pdf["_dt"].notna() & (pdf["_dt"] >= recent_cut)]
                prev = pdf[pdf["_dt"].notna() & (pdf["_dt"] < recent_cut) & (pdf["_dt"] >= prev_cut)]
                recent_views = float(recent["views"].sum())
                prev_views = float(prev["views"].sum())
            else:
                n = len(pdf)
                recent = pdf.tail(max(1, n // 3))
                prev = pdf.head(max(1, n // 3))
                recent_views = float(recent["views"].sum())
                prev_views = float(prev["views"].sum())
            er = float((pdf["likes"].sum() + pdf["comments"].sum()) / max(pdf["views"].sum(), 1.0))
        else:
            has_dates = any(r.get("_dt") for r in pdf)
            if has_dates:
                recent_cut = now.timestamp() - 30*86400
                prev_cut = now.timestamp() - 60*86400
                recent_views = sum(r["views"] for r in pdf if r.get("_dt") and r["_dt"].timestamp() >= recent_cut)
                prev_views = sum(r["views"] for r in pdf if r.get("_dt") and prev_cut <= r["_dt"].timestamp() < recent_cut)
            else:
                n = len(pdf)
                recent_views = sum(r["views"] for r in pdf[n*2//3:])
                prev_views = sum(r["views"] for r in pdf[:n//3])
            er = (sum(r["likes"] for r in pdf) + sum(r["comments"] for r in pdf)) / max(sum(r["views"] for r in pdf), 1.0)
        growth = (recent_views - prev_views) / max(prev_views, 1.0)
        score = 0.5 * er + 0.5 * (growth + 1)  # keep positive-ish scaling
        decision = "maintain"
        if score >= 1.0:
            decision = "invest_more"
        elif score < 0.6:
            decision = "deprioritize"
        results.append({
            "platform": platform,
            "engagementRate": er,
            "growth": growth,
            "score": float(score),
            "decision": decision,
        })
    # sort by score desc
    results.sort(key=lambda x: x["score"], reverse=True)
    return results


# ---- Growth Risk Alerts ----

def compute_growth_alerts(df):
    alerts = []
    if pd is not None and isinstance(df, pd.DataFrame):
        items = df.groupby("platform")
    else:
        groups = {}
        for r in df:
            groups.setdefault(r["platform"], []).append(r)
        items = groups.items()
    for platform, pdf in items:
        if (pd is not None and isinstance(df, pd.DataFrame) and pdf.empty) or (isinstance(pdf, list) and len(pdf)==0):
            continue
        # Build monthly views series
        if pd is not None and isinstance(df, pd.DataFrame):
            if pdf["_dt"].notna().any():
                ts = pdf[pdf["_dt"].notna()].copy()
                ts["month"] = ts["_dt"].dt.to_period("M").dt.to_timestamp()
                series = ts.groupby("month")["views"].sum().sort_index()
                y = series.values.astype(float)
            else:
                y = pdf["views"].astype(float).values
        else:
            pts = [r for r in pdf if r.get("_dt")]
            if pts:
                # group by month
                month_sum = {}
                for r in pts:
                    m = r["_dt"].replace(day=1, hour=0, minute=0, second=0, microsecond=0)
                    month_sum[m] = month_sum.get(m, 0.0) + float(r["views"])
                y = [v for _, v in sorted(month_sum.items(), key=lambda x: x[0])]
            else:
                y = [float(r["views"]) for r in pdf]
        if len(y) < 3:
            continue
        # Linear trend approximation (no numpy dependency)
        n = len(y)
        x = list(range(n))
        x_mean = sum(x)/n; y_mean = sum(y)/n
        denom = sum((xi - x_mean)**2 for xi in x)
        slope = sum((xi - x_mean)*(yi - y_mean) for xi, yi in zip(x, y)) / denom if denom != 0 else 0.0
        diffs = [y[i+1]-y[i] for i in range(len(y)-1)]
        if diffs:
            d_mean = sum(diffs)/len(diffs)
            vol = (sum((d - d_mean)**2 for d in diffs)/len(diffs))**0.5
        else:
            vol = 0.0
        # Heuristics
        if slope < -0.05 * y.mean():
            alerts.append({
                "platform": platform,
                "type": "declining_trend",
                "severity": "high" if slope < -0.15 * y.mean() else "medium",
                "details": {"slope": slope, "mean": float(y.mean())}
            })
        elif vol > 0.6 * y.mean():
            alerts.append({
                "platform": platform,
                "type": "high_volatility",
                "severity": "medium",
                "details": {"volatility": vol, "mean": float(y.mean())}
            })
        elif y[-1] <= 1.05 * y.max() and slope < 0.01 * y.mean():
            alerts.append({
                "platform": platform,
                "type": "stagnation",
                "severity": "low",
                "details": {"slope": slope, "mean": float(y.mean())}
            })
    return alerts


# ---- Content Theme Clusters ----

def compute_content_themes(df, k=3):
    themes = []
    if pd is not None and isinstance(df, pd.DataFrame):
        items = df.groupby("platform")
    else:
        groups = {}
        for r in df:
            groups.setdefault(r["platform"], []).append(r)
        items = groups.items()
    for platform, pdf in items:
        if (pd is not None and isinstance(df, pd.DataFrame) and pdf.empty) or (isinstance(pdf, list) and len(pdf)==0):
            continue
        # Features: ER, views, likes, comments, duration
        if pd is not None and isinstance(df, pd.DataFrame):
            feats = pd.DataFrame()
            feats["er"] = pdf["er"].clip(0, 5)
            feats["views"] = (pdf["views"] - pdf["views"].mean()) / (pdf["views"].std() or 1.0)
            feats["likes"] = (pdf["likes"] - pdf["likes"].mean()) / (pdf["likes"].std() or 1.0)
            feats["comments"] = (pdf["comments"] - pdf["comments"].mean()) / (pdf["comments"].std() or 1.0)
            feats["duration"] = ((pdf.get("durationSec") or 0) - (pdf.get("durationSec") or 0).mean()) / ((pdf.get("durationSec") or 0).std() or 1.0) if "durationSec" in pdf.columns else 0
            if KMeans is not None:
                try:
                    kk = min(k, max(1, len(pdf)//5)) or 1
                    model = KMeans(n_clusters=kk, n_init=5, random_state=42)
                    labels = model.fit_predict(getattr(feats, 'values', feats))
                    pdf = pdf.copy()
                    pdf["cluster"] = labels
                    unique_clusters = sorted(set(pdf["cluster"].tolist()))
                    for cid in unique_clusters:
                        sub = pdf[pdf["cluster"] == cid]
                        theme = {
                            "platform": platform,
                            "clusterId": int(cid),
                            "count": int(len(sub)),
                            "avgEr": float(sub["er"].mean()),
                            "avgViews": float(sub["views"].mean()),
                            "examples": list(filter(None, (sub.get("title") or pd.Series([None]*len(sub))).head(3).tolist()))
                        }
                        themes.append(theme)
                    continue
                except Exception:
                    pass
            # Fall through to simple bucketing
            vals = pdf.sort_values("er")
            splits = [0.33, 0.66]
            idx1 = int(len(vals)*splits[0]); idx2 = int(len(vals)*splits[1])
            buckets = [vals.iloc[:idx1], vals.iloc[idx1:idx2], vals.iloc[idx2:]]
            for cid, sub in enumerate(buckets):
                if len(sub)==0: continue
                themes.append({
                    "platform": platform,
                    "clusterId": cid,
                    "count": int(len(sub)),
                    "avgEr": float(sub["er"].mean()),
                    "avgViews": float(sub["views"].mean()),
                    "examples": list(filter(None, (sub.get("title") or pd.Series([None]*len(sub))).head(3).tolist()))
                })
        else:
            # Pure Python: bucket by ER tertiles
            ers = sorted([r["er"] for r in pdf])
            if not ers:
                continue
            q1 = ers[int(len(ers)*0.33)]
            q2 = ers[int(len(ers)*0.66)]
            by_cid = {0: [], 1: [], 2: []}
            for r in pdf:
                cid = 0 if r["er"] <= q1 else (1 if r["er"] <= q2 else 2)
                by_cid[cid].append(r)
            for cid, lst in by_cid.items():
                if not lst:
                    continue
                themes.append({
                    "platform": platform,
                    "clusterId": int(cid),
                    "count": len(lst),
                    "avgEr": sum(x["er"] for x in lst)/len(lst),
                    "avgViews": sum(x["views"] for x in lst)/len(lst),
                    "examples": [x.get("title") for x in lst[:3] if x.get("title")],
                })
    # Rank themes by avgEr then avgViews
    themes.sort(key=lambda t: (t["avgEr"], t["avgViews"]), reverse=True)
    return themes[:9]


def assemble_output(df):
    posting = compute_posting_schedule(df)
    focus = compute_platform_focus(df)
    alerts = compute_growth_alerts(df)
    themes = compute_content_themes(df)
    engine = "python"
    if pd is not None:
        engine += "+pandas"
    if np is not None:
        engine += "+numpy"
    if KMeans is not None:
        engine += "+sklearn"
    return {
        "generatedAt": datetime.utcnow().isoformat() + "Z",
        "postingSchedule": posting,
        "platformFocus": focus,
        "alerts": alerts,
        "contentThemes": themes,
        "meta": {
            "engine": engine,
            "notes": [
                "v1 heuristics/statistics only; no heavy forecasting",
                "Posting schedule prefers engagement rate, falls back to views",
                "Pure-Python fallback used if numpy/pandas/sklearn not present",
            ]
        }
    }


def read_input(argv):
    parser = argparse.ArgumentParser()
    parser.add_argument('--files', nargs='*', help='Optional JSON file paths (platform exports)')
    args = parser.parse_args(argv)

    if args.files:
        platforms = defaultdict(list)
        for path in args.files:
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    # allow either list or object with platform key
                    if isinstance(data, dict) and 'platform' in data and 'items' in data:
                        platforms[data['platform']].extend(data['items'])
                    elif isinstance(data, list):
                        # attempt to infer platform from entries or filename
                        plat = None
                        for rec in data:
                            p = (rec.get('platform') or '').lower()
                            if p:
                                plat = p; break
                        if not plat:
                            # derive from filename
                            name = path.lower()
                            for cand in ['youtube','instagram','tiktok','facebook']:
                                if cand in name:
                                    plat = cand; break
                        platforms[plat or 'unknown'].extend(data)
                    else:
                        # treat dict as single record
                        platforms['unknown'].append(data)
            except Exception as e:
                print(json.dumps({"error": f"Failed to read {path}: {e}"}), file=sys.stderr)
        return {"platforms": platforms}
    else:
        # read from stdin
        raw = sys.stdin.read()
        if not raw.strip():
            return {"platforms": {}}
        data = json.loads(raw)
        return data


def main(argv=None):
    data = read_input(argv if argv is not None else sys.argv[1:])
    platforms = data.get('platforms') or {}
    frames = []
    for plat, records in platforms.items():
        frames.append(build_df(plat, records))
    if pd is not None and all(isinstance(x, type(pd.DataFrame())) for x in frames):  # type: ignore
        df = pd.concat(frames, ignore_index=True) if frames else pd.DataFrame(columns=['platform'])
    else:
        # Flatten list path
        flat = []
        for x in frames:
            if isinstance(x, list):
                flat.extend(x)
        df = flat
    out = assemble_output(df)
    print(json.dumps(out, ensure_ascii=False))


if __name__ == '__main__':
    main()
