import React, { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Custom Printed T-Shirt",
      price: 499,
      quantity: 1,
      image:
        "https://res.cloudinary.com/dnexwb7jw/image/upload/v1756206400/products/eosrhtzb9d5szhmvbxjf.png",
    },
    {
      id: 2,
      name: "Bluetooth Speaker",
      price: 1299,
      quantity: 2,
      image:
        "https://res.cloudinary.com/dnexwb7jw/image/upload/v1756206585/products/ly9pdtbixfp3tfcwiyw5.png",
    },
  ]);

  // Increment quantity
  const increment = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrement quantity
  const decrement = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Calculate total
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container my-5">
      <h2 className="mb-4">My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center">
            <thead className="table-light">
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="d-flex align-items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "60px", height: "60px", objectFit: "cover" }}
                    />
                    <span>{item.name}</span>
                  </td>
                  <td>₹ {item.price}</td>
                  <td>
                    <div className="d-flex justify-content-center align-items-center gap-2">
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => decrement(item.id)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => increment(item.id)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>₹ {item.price * item.quantity}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end fw-bold">
                  Total:
                </td>
                <td colSpan="2" className="fw-bold">
                  ₹ {total}
                </td>
              </tr>
            </tfoot>
          </table>
          <div className="text-end">
            <button className="btn btn-success">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
