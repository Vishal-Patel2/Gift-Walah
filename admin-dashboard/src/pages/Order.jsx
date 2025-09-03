import React, { useState, useEffect } from "react";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Backend se poore orders fetch kar rahe hain
        const res = await fetch("http://localhost:4000/api/cart/all-orders");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="order-page">
      <h2>Total Orders: {orders.length}</h2>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Products</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order._id || index}>
                <td>{index + 1}</td>
                <td>{order.userId?.name || "N/A"}</td>
                <td>
                  {order.products?.map((p, i) => (
                    <span key={i}>{p.productName} x {p.quantity}, </span>
                  ))}
                </td>
                <td>₹{order.totalPrice?.toLocaleString("en-IN") || 0}</td>
                <td>{order.status || "Pending"}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
