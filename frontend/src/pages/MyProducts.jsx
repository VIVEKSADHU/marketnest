import { useEffect, useState } from "react";
import api from "../lib/api";

function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/products/mine");
      setProducts(res.data.products || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);

  const handleArchive = async (id) => {
    try {
      await api.delete(`/api/products/${id}`);
      fetchMyProducts();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to archive product");
    }
  };

  const handleUnarchive = async (id) => {
    try {
      await api.patch(`/api/products/${id}/restore`);
      fetchMyProducts();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to unarchive product");
    }
  };

  const toggleStatus = async (product) => {
    const nextStatus = product.status === "published" ? "draft" : "published";

    try {
      await api.put(`/api/products/${product._id}`, { status: nextStatus });
      fetchMyProducts();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) return <p className="container">Loading...</p>;
  if (error) return <p className="container">{error}</p>;

  return (
    <div className="container">
      <section className="hero">
        <h1>My Products</h1>
        <p>Manage listing status and archive your products.</p>
      </section>

      <div className="grid">
        {products.map((product) => (
          <div className="card" key={product._id}>
            {product.images?.[0] && (
              <img
                className="card-image"
                src={product.images[0]}
                alt={product.title}
              />
            )}
            <h3 className="card-title">{product.title}</h3>
            <p className="card-text">{product.description}</p>
            <p className="price">₹{product.price}</p>
            <p className="card-text">Status: {product.status}</p>
            <p className="card-text">
              Visibility: {product.isDeleted ? "Archived" : "Active"}
            </p>
            <div className="pagination">
              <button
                className="btn btn-outline"
                onClick={() => toggleStatus(product)}
                disabled={product.isDeleted}
              >
                Toggle Status
              </button>
              {!product.isDeleted ? (
                <button
                  className="btn btn-outline"
                  onClick={() => handleArchive(product._id)}
                >
                  Archive
                </button>
              ) : (
                <button
                  className="btn btn-outline"
                  onClick={() => handleUnarchive(product._id)}
                >
                  Unarchive
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyProducts;
