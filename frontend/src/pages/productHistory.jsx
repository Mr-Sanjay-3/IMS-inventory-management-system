import React, { useEffect, useState } from "react";
import styles from '../scss/productHistory.module.scss'
import API from "../api/axios";

const  ProductHistoryPanel = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get(
          "/category"
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
  const categoryId = e.target.value;
  setSelectedCategory(categoryId);

  if (!categoryId) {
    setProducts([]);
    return;
  }
  try {
    const res = await API.get(
      `/product/category/name/${categoryId}`
    );

    setProducts(res.data);
  } catch (error) {
    console.error("Error fetching products:", error);
    setProducts([]);
  }
};

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Category Wise Products</h2>

      <select
        className={styles.select_box}
        value={selectedCategory}
        onChange={handleCategoryChange}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>

      {products.length > 0 && (
        <div className={styles.table_wrapper}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod, index) => (
                <tr
                  key={prod._id}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <td>{prod.name}</td>
                  <td>₹ {prod.price}</td>
                  <td>{prod.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedCategory && products.length === 0 && (
        <p className={styles.no_data}>
          No products found for this category.
        </p>
      )}
    </div>
  );
};

export default ProductHistoryPanel;
