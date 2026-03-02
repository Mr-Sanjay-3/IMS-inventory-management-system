import React, { useState, useEffect } from "react";
import styles from '../scss/productPage.module.scss';
import {
  getProduct,
  deleteProduct,
} from "../api/productApi";

import ProductForm from "../components/productForm";
import ProductTable from "../components/productTable";
import Loader from "../Subcomponents/LoadingAnimation";
import Footer from "../Subcomponents/Footer";

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
  //
   const  handleCreateClick  = ()=>{
    setShowForm(true)
   }
   const handleCloseForm = ()=> {
    setShowForm(false)
   }

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
         <button 
  onClick={handleCreateClick}
  className={styles.defaultcreateproduct}
  >
        +
      </button>
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
  try {
    const res = await deleteProduct(id);
    console.log("Delete Response:", res.data);
    setProducts((prev) => prev.filter((p) => p._id !== id)); // update state immediately
  } catch (err) {
    console.error("Delete Error:", err.response || err);
    alert(err.response?.data?.message || "Delete failed");
  }
}}
        />     
    </div>
    </div>
  </>
     
  
);
};

export default productPage;
