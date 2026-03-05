import { useEffect, useState } from "react";
import api from "../lib/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/products/dashboard/stats");

        setStats(res.data);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err?.response?.data?.error ||
            "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p>Loading dashboard...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h2 style={{ marginBottom: "16px" }}>Brand Dashboard</h2>
      <div className="grid stats-grid">
        <div className="card stat-card">
          <p>Total products</p>
          <h3>{stats?.totalProducts ?? 0}</h3>
        </div>
        <div className="card stat-card">
          <p>Published</p>
          <h3>{stats?.publishedProducts ?? 0}</h3>
        </div>
        <div className="card stat-card">
          <p>Archived</p>
          <h3>{stats?.archivedProducts ?? 0}</h3>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
