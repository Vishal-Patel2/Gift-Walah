import React, { useState, useEffect } from "react";
import { FaUser, FaShoppingCart, FaBox, FaStar, FaSearch } from "react-icons/fa";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 30;

  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    // Fetch products
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/products/product");
        const data = await res.json();
        setProducts(data);
        setTotalProducts(data.length);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    // Fetch total users
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/cart/total-users");
        const data = await res.json();
        setTotalUsers(data.totalUsers);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    // Fetch total orders
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/cart/total-orders");
        const data = await res.json();
        setTotalOrders(data.totalOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchProducts();
    fetchUsers();
    fetchOrders();
  }, []);

  // --- Filter & Pagination ---
  const filteredProducts = products.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      (item.brand && item.brand.toLowerCase().includes(search.toLowerCase()))
  );

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = filteredProducts.slice(firstIndex, lastIndex);
  const npage = Math.ceil(filteredProducts.length / recordsPerPage);

  const nextPage = () => { if (currentPage < npage) setCurrentPage(currentPage + 1); };
  const prevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

  return (
    <div className="right-content w-100">
      {/* --- Top Cards --- */}
      <div className="dashboard-grid">
        <div className="dashboardBox users">
          <div className="top"><h4>Total Users</h4><FaUser className="icon" /></div>
          <h2>{totalUsers}</h2>
        </div>
        <div className="dashboardBox orders">
          <div className="top"><h4>Total Orders</h4><FaShoppingCart className="icon" /></div>
          <h2>{totalOrders}</h2>
        </div>
        <div className="dashboardBox products">
          <div className="top"><h4>Total Products</h4><FaBox className="icon" /></div>
          <h2>{totalProducts}</h2>
        </div>
        <div className="dashboardBox reviews">
          <div className="top"><h4>Total Reviews</h4><FaStar className="icon" /></div>
          <h2>166</h2>
        </div>
      </div>

      {/* --- Table Section --- */}
      <div className="table-section">
        <div className="table-header">
          <h3>Product List</h3>
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search product, category, brand..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table>
            <thead style={{ backgroundColor: "#4CAF50", color: "white" }}>
              <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Orders</th>
                <th>Sales</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.length > 0 ? (
                currentRecords.map((item, idx) => (
                  <tr key={item._id || idx}>
                    <td>{firstIndex + idx + 1}</td>
                    <td className="product-cell">
                      <img src={item.images?.[0] || "https://via.placeholder.com/50"} alt={item.name} className="product-img" />
                      <span>{item.name}</span>
                    </td>
                    <td>{item.category}</td>
                    <td>{item.brand || "-"}</td>
                    <td>₹{item.price?.toLocaleString("en-IN")}</td>
                    <td>{item.orders || 0}</td>
                    <td>₹{item.sales?.toLocaleString("en-IN") || 0}</td>
                    <td>
                      <button className="btn btn-edit">Edit</button>
                      <button className="btn btn-delete">Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center" }}>No matching records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>Prev</button>
          <span>Page {currentPage} of {npage || 1}</span>
          <button onClick={nextPage} disabled={currentPage === npage}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
