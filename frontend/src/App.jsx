import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Marketplace from "./pages/Marketplace";
import CreateProduct from "./pages/CreateProduct";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";
import MyProducts from "./pages/MyProducts";
import BrandRoute from "./components/BrandRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Marketplace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/create-product"
          element={
            <BrandRoute>
              <CreateProduct />
            </BrandRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <BrandRoute>
              <Dashboard />
            </BrandRoute>
          }
        />
        <Route
          path="/my-products"
          element={
            <BrandRoute>
              <MyProducts />
            </BrandRoute>
          }
        />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
