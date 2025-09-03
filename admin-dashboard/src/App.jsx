import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import AdminLogin from "./pages/AdminLogin";
import { useAdmin } from "./context/AdminContext"; // 👈 context import
import Order from "./pages/Order";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { token } = useAdmin(); 
  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }
  return children;
};

// Layout wrapper for pages with header + sidebar
const Layout = ({ children, isDesktop, sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Header */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        <Header />
      </div>

      {/* Sidebar */}
      <Sidebar
        topOffset={80} // Header height
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isDesktop={isDesktop}
      />

      {/* Page Content */}
      <div
        style={{
          marginTop: "80px", // Header height
          marginLeft: isDesktop ? "260px" : "0", // Sidebar width
          transition: "margin-left 0.3s",
          padding: "20px",
          minHeight: "100vh",
          background: "#f3f4f6",
        }}
      >
        {children}
      </div>
    </>
  );
};

const App = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { token } = useAdmin();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Routes>
      {/* Public Login Page → Always accessible */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* Protected Routes (Only visible if login) */}
      {token ? (
        <Route
          path="/*"
          element={
            <Layout
              isDesktop={isDesktop}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            >
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products-list" element={<ProductList />} />
                <Route path="/add/products" element={<AddProduct />} />
                <Route path="/products/details" element={<ProductDetails />} />
                <Route path="/categories" element={<h2>Categories Page</h2>} />
                <Route path="/orders" element={<Order/>} />
              </Routes>
            </Layout>
          }
        />
      ) : (
        // Agar login nahi hai → Har route login page par le jao
        <Route path="*" element={<Navigate to="/admin-login" replace />} />
      )}
    </Routes>
  );
};

export default App;
