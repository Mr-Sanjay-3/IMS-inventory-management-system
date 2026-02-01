import React ,{useState, useEffect} from 'react';
import Navbar from '../Subcomponents/sideNavbar';

import {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
} from '../api/productApi'

import ProductForm from '../components/productForm';
import ProductTable from '../components/productTable';
import Loader from "../Subcomponents/LoadingAnimation";
 
const productPage = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

    <div>
   {/* <Navbar /> */}

      <h2>Products</h2>

      <ProductForm
        editProduct={editProduct}
        refresh={fetchProducts}
        clearEdit={() => setEditProduct(null)}
      />

      <ProductTable
        products={products}
        onEdit={setEditProduct}
        onDelete={async (id) => {
          await deleteProduct(id);
          fetchProducts();
        }}
      />
    </div>
   
   </>
  )
}

export default productPage;