import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryPanel = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/categories"
        );
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle category change
  const handleCategoryChange = async (e) => {
    const categoryName = e.target.value;
    setSelectedCategory(categoryName);

    if (categoryName !== "") {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/products/category/name/${encodeURIComponent(categoryName)}`
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    } else {
      setProducts([]);
    }
  };

  return (
    <div className="category-panel">
      <h2>Category Wise Products</h2>

      {/* Dropdown */}
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Products Table */}
      {products.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id}>
                <td>{prod.name}</td>
                <td>₹ {prod.price}</td>
                <td>{prod.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedCategory && products.length === 0 && (
        <p>No products found for this category.</p>
      )}
    </div>
  );
};

export default CategoryPanel;
