import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";

function Navbar(){
  const navigate = useNavigate();
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
  const role = localStorage.getItem("userRole");

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userRole");
      navigate("/login");
    }
  };

  return(
    <header className="navbar-wrap">
      <div className="navbar container">
        <Link to="/" className="brand">MarketNest</Link>

        <nav className="nav-links">
          <Link to="/">Marketplace</Link>
          {role === "brand" && <Link to="/create-product">Sell</Link>}
          {role === "brand" && <Link to="/my-products">My Products</Link>}
          {role === "brand" && <Link to="/dashboard">Dashboard</Link>}
          {!isLoggedIn && <Link to="/login">Login</Link>}
          {!isLoggedIn && <Link to="/signup">Signup</Link>}
          {isLoggedIn && (
            <button className="btn btn-outline" onClick={handleLogout}>
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>

  );

}

export default Navbar;
