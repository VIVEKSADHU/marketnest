import { useState } from "react";
import api from "../lib/api";

function CreateProduct(){
  const [title,setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("men");
  const [status, setStatus] = useState("draft");
  const [price,setPrice] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const createProduct = async ()=>{
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("price", Number(price));
      formData.append("description", description.trim());
      formData.append("category", category);
      formData.append("status", status);

      for (const image of images) {
        formData.append("images", image);
      }

      await api.post("/api/products", formData);

      alert("Product created");
      setTitle("");
      setDescription("");
      setPrice("");
      setCategory("men");
      setStatus("draft");
      setImages([]);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to create product";
      alert(message);
    } finally {
      setLoading(false);
    }

  };

  return(

    <div className="container form-page">

      <h2>Create Product</h2>

      <input className="input" placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />
      <textarea
        className="input"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <input className="input" placeholder="Price" onChange={(e)=>setPrice(e.target.value)} />
      <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="shoes">Shoes</option>
      </select>
      <select className="input" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      <input
        className="input"
        type="file"
        multiple
        onChange={(e)=>setImages(Array.from(e.target.files || []))}
      />

      <button className="btn" onClick={createProduct} disabled={loading}>
        {loading ? "Creating..." : "Create"}
      </button>

    </div>

  );

}

export default CreateProduct;
