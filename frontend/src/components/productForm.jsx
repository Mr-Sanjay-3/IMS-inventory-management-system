import React, { useEffect, useState } from "react";
import { createProduct, updateProduct, getCategories } from "../api/productApi";
import '../scss/productForm.scss'

const ProductForm = ({ editProduct, refresh, clearEdit }) => {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    quantity: "",
    lowStockThreshold: ""
  });

  // load categories
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

  // edit mode
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editProduct) {
      await updateProduct(editProduct._id, form);
      clearEdit();
    } else {
      await createProduct(form);
    }

    setForm({
      name: "",
      sku: "",
      category: "",
      price: "",
      quantity: "",
      lowStockThreshold: ""
    });

    refresh();
  };

  return (
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
        {editProduct ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default ProductForm;
