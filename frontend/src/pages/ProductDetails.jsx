import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/api";

function ProductDetails(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Failed to load product"
        );
      }
    };

    fetchProduct();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="container product-detail">
      <div className="card">
        {product.images?.[0] && (
          <img
            className="detail-image"
            src={product.images[0]}
            alt={product.title}
          />
        )}
      </div>
      <div className="card">
        <h2>{product.title}</h2>
        <p className="card-text">{product.description}</p>
        <h3 className="price">₹{product.price}</h3>
      </div>
    </div>
  );

}

export default ProductDetails;
