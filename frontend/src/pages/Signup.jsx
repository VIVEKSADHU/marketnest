import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

function Signup() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      setLoading(true);

      await api.post("/api/auth/signup", {
        name: name.trim(),
        email: email.trim(),
        password,
        role
      });

      alert("Signup successful");
      setName("");
      setEmail("");
      setPassword("");
      setRole("customer");
      navigate("/login");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Signup failed";
      alert(message);
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="auth-wrap">
      <div className="auth-card card">
      <h2>Create Account</h2>
      <p className="card-text">Choose your role and start using MarketNest.</p>

      <input className="input" placeholder="Name" onChange={(e)=>setName(e.target.value)} />

      <input className="input" placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />

      <input
        className="input"
        placeholder="Password"
        type="password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="customer">Customer</option>
        <option value="brand">Brand</option>
      </select>

      <button className="btn" onClick={handleSignup} disabled={loading}>
        {loading ? "Signing up..." : "Signup"}
      </button>
      </div>
    </div>
  );
}

export default Signup;
