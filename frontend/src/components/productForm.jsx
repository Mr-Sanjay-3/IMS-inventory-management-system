import React, { useEffect, useState } from "react";
import { createProduct, updateProduct, getCategories } from "../api/productApi";
import styles from "../scss/productForm.module.scss";

const ProductForm = ({ editProduct, refresh, onSuccess }) => {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    quantity: "",
    lowStockThreshold: ""
  });

  // 🔹 Load categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCategories();
        setCategories(res.data);
      } catch (err) {
        console.error("Load category error", err);
      }
    };
    fetchData();
  }, []);

  // 🔹 Fill form in edit mode
  useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name || "",
        sku: editProduct.sku || "",
        category: editProduct.category?._id || "",
        price: editProduct.price || "",
        quantity: editProduct.quantity || "",
        lowStockThreshold: editProduct.lowStockThreshold || ""
      });
    }
  }, [editProduct]);

  const resetForm = () => {
    setForm({
      name: "",
      sku: "",
      category: "",
      price: "",
      quantity: "",
      lowStockThreshold: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editProduct) {
        await updateProduct(editProduct._id, form);
        alert("Product updated successfully");

        if (onSuccess) {
          onSuccess(); // used in UpdateProduct page
        }
      } else {
        await createProduct(form);
        alert("Product created successfully");

        if (refresh) {
          refresh(); // used in ProductPage
        }
      }

      resetForm();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className={styles.productForm}>
      <div className="container">
        <form onSubmit={handleSubmit}>

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            placeholder="SKU"
            value={form.sku}
            onChange={(e) =>
              setForm({ ...form, sku: e.target.value })
            }
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
          />

          <input
            placeholder="Quantity"
            type="number"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <input
            placeholder="Low Stock Alert"
            type="number"
            value={form.lowStockThreshold}
            onChange={(e) =>
              setForm({
                ...form,
                lowStockThreshold: e.target.value
              })
            }
          />

          <button type="submit">
            {editProduct ? "Update Product" : "Create Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default ProductForm;
