import React, { useState, useEffect } from "react";
import styles from '../scss/productPage.module.scss';
import {
  getProduct,
  deleteProduct
} from "../api/productApi";

import ProductForm from "../components/productForm";
import ProductTable from "../components/productTable";
import Loader from "../Subcomponents/LoadingAnimation";

const productPage = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchProducts = async () => {
    try {
      const res = await getProduct();
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

  return (
    <>
   <div className={styles.container}>
      <h2 className={styles.heading}>Products Management</h2>

 {showForm && (
      <div className={styles.inline_form}>
        <ProductForm
          editProduct={editProduct}
          refresh={fetchProducts}
          onSuccess={() => {
            setShowForm(false);
            setEditProduct(null);
            fetchProducts();
          }}
          onCancel={() => {
            setShowForm(false);
            setEditProduct(null);
          }}
        />
      </div>
    )}
    
      <div className={styles.content_card}>
        <ProductTable
          products={products}
          onEdit={(product) => {
            setEditProduct(product);
            setShowForm(true);
          }}
          onCreate={() => {
            setEditProduct(null);
            setShowForm(true);
          }}
          onDelete={async (id) => {
            await deleteProduct(id);
            fetchProducts();
          }}
        />
      </div>
    </div>
  </>
     
  
);
};

export default productPage;
