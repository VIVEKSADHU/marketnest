import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Marketplace() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchProducts = async () => {

    setLoading(true);

    try {

      const res = await axios.get(
        `https://marketnest-api-y3k7.onrender.com/api/products?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}&page=${page}&limit=6`
      );

      setProducts(res.data.products || []);
      setPages(res.data.pages || 1);

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        (err?.code === "ERR_NETWORK" ? "Network/CORS error: check deployed backend CORS + frontend API URL" : null) ||
        err?.message ||
        "Failed to load products"
      );

    } finally {
      setLoading(false);
    }

  };

  useEffect(() => {
    fetchProducts();
  }, [search, category, page]);

  return (

    <div className="container">

      <section className="hero">
        <h1>Fashion Marketplace</h1>
        <p>Discover trending products from independent brands.</p>
      </section>

      <div className="toolbar">

        <input
          className="input"
          placeholder="Search products..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <select
          className="input"
          value={category}
          onChange={(e) => {
            setPage(1);
            setCategory(e.target.value);
          }}
        >
          <option value="">All Categories</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="shoes">Shoes</option>
        </select>

      </div>

      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (

        <>
          <div className="grid">

            {products.map(product => (

              <Link
                key={product._id}
                to={`/product/${product._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >

                <div className="card">

                  {product.images?.[0] && (
                    <img
                      className="card-image"
                      src={product.images[0]}
                      alt={product.title}
                    />
                  )}

                  <h3 className="card-title">
                    {product.title}
                  </h3>

                  <p className="card-text">
                    {product.description}
                  </p>

                  <p className="price">
                    ₹{product.price}
                  </p>

                </div>

              </Link>

            ))}

          </div>

          <div className="pagination">

            <button
              className="btn btn-outline"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            <span>Page {page} of {pages}</span>

            <button
              className="btn btn-outline"
              disabled={page === pages}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>

          </div>

        </>

      )}

    </div>

  );
}

export default Marketplace;
