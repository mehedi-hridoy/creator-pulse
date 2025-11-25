import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Layout from "../layout/Layout";
import { Card } from "../components/ui/Card";
import { AlertCircle } from "lucide-react";

// Components
import PageHeader from "../components/recommendations/PageHeader";
import HeroCard from "../components/recommendations/HeroCard";
import SummarySection from "../components/recommendations/SummarySection";
import ContentIdeasGrid from "../components/recommendations/ContentIdeasGrid";
import ChatPanel from "../components/recommendations/ChatPanel";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function Recommendations() {
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
  const api = axios.create({ withCredentials: true });

  async function regenerate() {
    await api.post(`${API_BASE}/ai/recommendations/clear-cache`);
    await refetch();
  }

  async function handleAsk(question) {
    const res = await api.post(`${API_BASE}/ai/ask`, { question });
    return res.data?.answer || "";
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-muted-foreground">Loading recommendations...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        <PageHeader
          generatedAt={rec.generatedAt}
          onRefresh={() => refetch()}
          onRegenerate={regenerate}
          isFetching={isFetching}
        />

        {/* Error states */}
        {error && (
          <Card className="p-4 border-red-500/50 bg-red-500/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-500">
                  Failed to load recommendations
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {String(error?.message || "Unknown error")}
                </p>
              </div>
            </div>
          </Card>
        )}

        {backendError && (
          <Card className="p-4 border-amber-500/50 bg-amber-500/5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-amber-500">AI engine error</p>
                <p className="text-xs text-muted-foreground mt-1">{backendError}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Tip: Ensure system Python can run backend/ai/data_brain.py (no heavy packages required).
                </p>
              </div>
            </div>
          </Card>
        )}

        <HeroCard />

        <SummarySection narrative={narrative} />

        <ContentIdeasGrid contentIdeas={narrative.contentIdeas} />

        <ChatPanel onAsk={handleAsk} />
      </div>
    </Layout>
  );
}
