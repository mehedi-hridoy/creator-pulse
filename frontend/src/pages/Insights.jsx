import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Layout from "../layout/Layout";

axios.defaults.withCredentials = true;

export default function Insights() {
  const { data, isLoading } = useQuery({
    queryKey: ["ai-insights"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/ai/insights");
      return res.data.insights;
    },
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="text-gray-700">Generating AI insights...</div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <h1 className="text-2xl font-bold mb-4">AI Insights</h1>
        <p className="text-gray-600">
          No analytics yet. Upload some JSON files first, then come back here.
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">AI Insights</h1>

      {/* Summary */}
      <section className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-2">Performance Summary</h2>
        <p className="text-gray-700 leading-relaxed">{data.summary}</p>
      </section>

      {/* Strengths & Improvements */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <CardList title="Strengths" items={data.strengths} accent="text-green-600" />
        <CardList title="Areas to Improve" items={data.improvements} accent="text-red-600" />
      </section>

      {/* Suggestions */}
      <section className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-3">Actionable Suggestions</h2>
        <List items={data.suggestions} />
      </section>

      {/* Content Ideas */}
      <section className="bg-white rounded shadow p-6">
        <h2 className="text-xl font-semibold mb-3">Content Ideas</h2>
        <List items={data.contentIdeas} />
      </section>
    </Layout>
  );
}

function CardList({ title, items = [], accent }) {
  return (
    <div className="bg-white rounded shadow p-6">
      <h2 className={`text-xl font-semibold mb-3 ${accent}`}>{title}</h2>
      <List items={items} />
    </div>
  );
}

function List({ items = [] }) {
  if (!items.length) {
    return <p className="text-gray-500 text-sm">No items provided.</p>;
  }

  return (
    <ul className="list-disc ml-6 space-y-1 text-gray-700">
      {items.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  );
}
