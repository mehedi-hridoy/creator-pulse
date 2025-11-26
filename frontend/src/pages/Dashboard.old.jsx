import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Layout from "../layout/Layout";

// Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Pie,
  PieChart,
  Cell,
} from "recharts";

axios.defaults.withCredentials = true;

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const res = await axios.get("https://api.creatorpulse.mehedihridoy.online/analytics/overview");
      return res.data.overview;
    },
  });

  if (isLoading)
    return (
      <Layout>
        <div className="p-6 text-gray-900 dark:text-white">Loading analytics...</div>
      </Layout>
    );

  if (!data)
    return (
      <Layout>
        <h1 className="text-xl text-gray-900 dark:text-white">
          No analytics yet. Upload JSON first.
        </h1>
      </Layout>
    );

  // Convert monthly trend → recharts format
  const monthlyData = Object.entries(data.monthlyTrend).map(([month, views]) => ({
    month,
    views,
  }));

  // Pie chart data
  const platformData = Object.entries(data.platformCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const colors = ["#3b82f6", "#ec4899", "#22c55e", "#f59e0b"];

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        Dashboard Overview
      </h1>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <MetricCard title="Total Views" value={data.totalViews} />
        <MetricCard title="Total Likes" value={data.totalLikes} />
        <MetricCard title="Total Comments" value={data.totalComments} />
        <MetricCard title="Total Shares" value={data.totalShares} />
        <MetricCard title="Total Posts" value={data.totalPosts} />
        <MetricCard
          title="Engagement Rate"
          value={`${data.engagementRate.toFixed(2)}%`}
        />
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LINE CHART */}
        <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Monthly Views Trend
          </h2>
          <LineChart width={500} height={260} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip />
            <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </div>

        {/* PIE CHART */}
        <div className="bg-white dark:bg-gray-800 shadow rounded p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Platform Distribution
          </h2>

          <PieChart width={420} height={260}>
            <Pie
              data={platformData}
              cx={200}
              cy={120}
              outerRadius={90}
              dataKey="value"
              label
            >
              {platformData.map((entry, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </Layout>
  );
}

function MetricCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded shadow">
      <h3 className="text-gray-500 dark:text-gray-400 text-sm">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
        {value}
      </p>
    </div>
  );
}
