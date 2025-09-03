// AddProduct.jsx
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    attributes: { size: "", color: "" },
    images: [],
  });

  const [preview, setPreview] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setProduct({ ...product, images: [...files] });
      setPreview(Array.from(files).map((f) => URL.createObjectURL(f)));
    } else if (name === "size" || name === "color") {
      setProduct({
        ...product,
        attributes: { ...product.attributes, [name]: value },
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("category", product.category);
    formData.append("attributes", JSON.stringify(product.attributes));

    product.images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const res = await fetch("http://localhost:4000/api/products/add", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Product added successfully!");
        console.log(data);

        // Reset form
        setProduct({
          name: "",
          description: "",
          price: "",
          discount: "",
          category: "",
          attributes: { size: "", color: "" },
          images: [],
        });
        setPreview([]);

        // Redirect to category page to see new product
        navigate(`/add/products`); // ya jo category page ho
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong");
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">🛍️ Add New Product</h2>
          <form onSubmit={handleSubmit}>
            {/* Product Name */}
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product name"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                rows="4"
                placeholder="Enter product description"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Price & Discount */}
            <div className="row mb-3">
              <div className="col-md-6 mb-3 mb-md-0">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter price"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Discount (%)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter discount"
                  name="discount"
                  value={product.discount}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Kitchen">kitchen</option>
                <option value="Smartwatch">Smartwatch</option>
                <option value="Bags">Bags</option>
                <option value="Buds">Buds</option>
                <option value="GraphicsCards">GraphicsCards</option>
                <option value="BluetoothSpeakers">BluetoothSpeakers</option>
                <option value="Bottle">Bootle</option>
              </select>
            </div>

            {/* Attributes */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Size</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter size (e.g. L, XL)"
                  name="size"
                  value={product.attributes.size}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Color</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter color"
                  name="color"
                  value={product.attributes.color}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label">Product Images</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                name="images"
                multiple
                onChange={handleChange}
                required
              />
              {preview.length > 0 && (
                <div className="mt-3 d-flex flex-wrap gap-2">
                  {preview.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      alt="Preview"
                      className="img-thumbnail"
                      style={{ maxWidth: "120px", maxHeight: "120px" }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-success w-100 py-2">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
