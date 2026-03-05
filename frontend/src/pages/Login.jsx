import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/api";

function Login(){
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await api.post("/api/auth/login", {
        email: email.trim(),
        password
      });

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("userRole", res.data.user.role);

      alert("Login successful");
      navigate(res.data.user.role === "brand" ? "/dashboard" : "/");

    } catch(error){
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Login failed";
      alert(message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return(
    <div className="auth-wrap">
      <div className="auth-card card">
        <h2>Welcome Back</h2>
        <p className="card-text">Login to manage or explore products.</p>

      <input
        className="input"
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        className="input"
        placeholder="Password"
        type="password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button className="btn" onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p style={{ marginTop: "10px" }} className="card-text">
        New user? <Link to="/signup">Create an account</Link>
      </p>
      </div>
    </div>

  );
}

export default Login;
