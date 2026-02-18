import React, { useState, useEffect } from "react";
import Navbar from "../Subcomponents/sideNavbar";
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
    
        <h2 className="Headig" style={{justifyContent:"center", textAlign:"center", backgroundColor:"royalblue"}}>Products</h2>

        {/*Show Form When Needed */}
        {showForm && (
          <ProductForm
            editProduct={editProduct}
            refresh={fetchProducts}
            onSuccess={() => {
              setShowForm(false);
              setEditProduct(null);
              fetchProducts();
            }}
          />
        )}

        <ProductTable
          products={products}

          //Edit
          onEdit={(product) => {
            setEditProduct(product);
            setShowForm(true);
          }}

          //Create Button
          onCreate={() => {
            setEditProduct(null);
            setShowForm(true);
          }}

          //Delete
          onDelete={async (id) => {
            await deleteProduct(id);
            fetchProducts();
          }}
        />
     </>
  );
};

export default productPage;
