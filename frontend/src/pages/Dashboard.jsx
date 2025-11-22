import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Layout from "../layout/Layout";

axios.defaults.withCredentials = true;

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/analytics/overview");
      return res.data.overview;
    }
  });

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <Layout><h1>No data yet. Upload JSON!</h1></Layout>;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

      <div className="grid grid-cols-4 gap-4">
        <Card title="Total Views" value={data.totalViews} />
        <Card title="Total Likes" value={data.totalLikes} />
        <Card title="Total Comments" value={data.totalComments} />
        <Card title="Total Posts" value={data.totalPosts} />
      </div>
    </Layout>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <h3 className="text-gray-600">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
