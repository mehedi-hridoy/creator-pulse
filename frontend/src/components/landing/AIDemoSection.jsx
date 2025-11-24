export default function AIDemoSection() {
  return (
    <section
      id="demo"
      className="bg-brand.bg py-16 text-white"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="font-heading text-2xl font-semibold md:text-3xl">
          See what the AI actually tells you.
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-gray-300 md:text-base">
          In your dashboard, you’ll upload your JSON once and
          get a live AI summary tailored to your audience and
          posting habits.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Example summary
            </p>
            <p className="mt-3 text-sm text-gray-100">
              “Short-form videos mentioning{" "}
              <span className="text-brand.accent">
                ‘productivity’
              </span>{" "}
              see 1.9× higher completion rate. Try posting 3–4
              times per week between{" "}
              <span className="text-brand.accent">
                7pm–10pm
              </span>{" "}
              for your current audience.”
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Example recommendations
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-100">
              <li>
                Double down on high-retention Reels and Shorts.
              </li>
              <li>
                Turn your best-performing carousel into a video
                script.
              </li>
              <li>
                Experiment with Q&A style posts on weekends.
              </li>
              <li>
                Test thumbnails with fewer words and bold colors.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10">
          <a
            href="/signup"
            className="inline-flex items-center rounded-full bg-brand.primary px-6 py-2.5 text-sm font-medium text-white shadow-soft-glow transition hover:bg-brand.purple"
          >
            Start with your own data
          </a>
        </div>
      </div>
    </section>
  );
}
