import React, { useEffect, useState } from "react";
import API from "../api/axios";
import styles from "../scss/productPage.module.scss";
import Loader from "../Subcomponents/LoadingAnimation";


const StaffProductHistory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("All");

  const fetchProducts = async () => {
    try {
      const res = await API.get("/product");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <Loader />;

  // Get unique category names safely (handle object or string)
  const categories = [
    "All",
    ...new Set(
      products.map((p) =>
        p.category && typeof p.category === "object" ? p.category.name : p.category
      )
    ),
  ];

  // Filter products based on selected category
  const filteredProducts =
    filterCategory === "All"
      ? products
      : products.filter(
          (p) =>
            (p.category && typeof p.category === "object"
              ? p.category.name
              : p.category) === filterCategory
        );

  return (
    <div className={styles.container}>
      <h2>Product History</h2>

      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        {categories.map((cat, i) => (
          <option key={i} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
             <th>Stock</th>
            <th>Stoc Keeping Unit</th>
            <th>Low Stock Deatils</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((p) => (
            <tr key={p._id}>
              <td>{p.name}</td>
              <td>
                {p.category && typeof p.category === "object"
                  ? p.category.name
                  : p.category}
              </td>
              <td>₹{p.price}</td>
              <td>{p.quantity}</td>
              <td>{p.sku}</td>
              <td>{p.lowStockThreshold}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default StaffProductHistory;