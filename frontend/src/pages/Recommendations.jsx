import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Layout from "../layout/Layout";
import { Card } from "../components/ui/Card";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const WEEKDAYS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function fmtTime(h) {
  const hour = ((h % 24) + 24) % 24;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hr = hour % 12 || 12;
  return `${hr}:00 ${ampm}`;
}

export default function Recommendations() {
  const [asking, setAsking] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const res = await axios.get(`${API_BASE}/ai/recommendations`, { withCredentials: true });
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
  });

  const backendError = (!data?.success && data?.error) ? data.error : null;
  const rec = data?.recommendations || {};
  const narrative = data?.narrative || { summary: "", actions: [], contentIdeas: [] };
  const posting = rec.postingSchedule || {};
  const focus = rec.platformFocus || [];
  const alerts = rec.alerts || [];
  const themes = rec.contentThemes || [];
  const api = axios.create({ withCredentials: true });

  function mdToHtml(md) {
    if (!md) return "";
    let html = md
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    html = html.replace(/^###\s?(.*)$/gm, '<h3 class="text-[16px] font-bold mt-3">$1</h3>');
    html = html.replace(/^##\s?(.*)$/gm, '<h2 class="text-[18px] font-bold mt-4">$1</h2>');
    html = html.replace(/^#\s?(.*)$/gm, '<h1 class="text-[20px] font-bold mt-4">$1</h1>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\n\n- /g, '\n\n• ');
    html = html.replace(/\n- /g, '\n• ');
    html = html.replace(/\n/g, '<br/>');
    return html;
  }

  async function regenerate() {
    await api.post(`${API_BASE}/ai/recommendations/clear-cache`);
    await refetch();
  }

  async function ask() {
    if (!question.trim()) return;
    setAsking(true);
    try {
      const res = await api.post(`${API_BASE}/ai/ask`, { question });
      setAnswer(res.data?.answer || "");
    } finally {
      setAsking(false);
    }
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[36px] font-bold text-foreground tracking-tight">AI Recommendations</h1>
            <p className="text-[14px] text-muted-foreground">Generated at {rec.generatedAt ? new Date(rec.generatedAt).toLocaleString() : '—'} {rec?.meta?.engine ? `• Engine: ${rec.meta.engine}` : ''}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => refetch()} className="upload-btn-primary w-auto px-4 py-2.5">{isFetching ? 'Refreshing…' : 'Refresh'}</button>
            <button onClick={regenerate} className="upload-btn-danger w-auto px-4 py-2.5">Regenerate</button>
          </div>
        </div>

        {/* Intro banner */}
        <Card className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#675AFF]/15 text-[#675AFF] text-[11px] font-bold uppercase tracking-widest mb-2">CreatorPulse</div>
              <p className="text-[16px] text-foreground font-semibold">Hi, we’re CreatorPulse — your AI analytics copilot.</p>
              <p className="text-[13px] text-muted-foreground mt-1">Ask for posting windows, platform focus, risks, and content ideas. Upload timestamped posts to unlock schedule insights.</p>
            </div>
          </div>
        </Card>

        {error && (
          <Card className="p-4">
            <p className="text-[13px] text-[#FF5A5F] font-semibold">Failed to load recommendations: {String(error?.message || 'Unknown error')}</p>
          </Card>
        )}
        {backendError && (
          <Card className="p-4">
            <p className="text-[13px] text-[#F59E0B] font-semibold">AI engine error: {backendError}</p>
            <p className="text-[12px] text-muted-foreground mt-1">Tip: Ensure system Python can run backend/ai/data_brain.py (no heavy packages required).</p>
          </Card>
        )}

        {/* Narrative */}
        <Card className="p-7">
          <h3 className="text-[22px] font-bold text-foreground mb-3">Summary</h3>
          <p className="text-[15px] text-foreground/90 leading-7">{narrative.summary || 'No summary available yet.'}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="text-[13px] font-bold text-foreground uppercase tracking-widest mb-2">Top Actions</h4>
              <ul className="space-y-2 list-disc pl-5 text-[14px] text-foreground/90">
                {(narrative.actions || []).map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-[13px] font-bold text-foreground uppercase tracking-widest mb-2">Content Ideas</h4>
              <ul className="space-y-2 list-disc pl-5 text-[14px] text-foreground/90">
                {(narrative.contentIdeas || []).map((a, i) => <li key={i}>{a}</li>)}
              </ul>
            </div>
          </div>
        </Card>

        {/* Ask the AI */}
        <Card className="p-7">
          <div className="mb-3">
            <h3 className="text-[22px] font-bold text-foreground mb-1">Ask CreatorPulse</h3>
            <p className="text-[13px] text-muted-foreground">Ask follow-up questions about your recommendations.</p>
          </div>
          <div className="space-y-3">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
              className="w-full rounded-[14px] bg-transparent border border-border p-3 text-foreground"
              placeholder="e.g., What should I post next week on Instagram?"
            />
            <div className="flex items-center gap-2">
              <button disabled={asking} onClick={ask} className="upload-btn-primary w-auto px-4 py-2.5">{asking ? 'Thinking…' : 'Ask'}</button>
              <button onClick={()=>setAnswer("")} className="glass-card rounded-[12px] px-3 py-2 text-[13px] text-muted-foreground">Clear</button>
            </div>
            {!answer && (
              <div className="glass-card rounded-[14px] p-4 text-[14px] text-muted-foreground">
                Hi, we’re <strong>CreatorPulse</strong>. Ask us anything about your analytics — posting windows, where to focus, risks, and content ideas.
              </div>
            )}
            {answer && (
              <div className="glass-card rounded-[14px] p-4 max-w-none text-[14px]">
                <div dangerouslySetInnerHTML={{ __html: mdToHtml(answer) }} />
              </div>
            )}
          </div>
        </Card>

        {/* Posting Schedule & Platform Focus intentionally removed per request */}

        

        
        
      </div>
    </Layout>
  );
}
