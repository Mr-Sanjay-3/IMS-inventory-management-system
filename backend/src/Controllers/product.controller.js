import Product from '../models/Product.js';

/** Admin Can Create Products {Mean Admin permison need for product include} */
export const createproduct = async (req, res)=>{
try{
    const product = await Product.create(req.body);
    res.status(201).json(product)
}catch(error){
  res.status(400).json({msg : error.message})
}
}

/** Admin + Staff: Get all products*/
export const getProducts = async (req, res) => {
 try {
   const products = await Product.find()
     .populate("category", "name")
     .populate("supplier", "name");
   res.json(products);
 } catch (err) {
   res.status(500).json({ msg: err.message });
 }
};

/**
 * Admin + Staff: Get single product
 */
export const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id)
        .populate("category", "name")
        .populate("supplier", "name");
  
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
  
      res.json(product);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };
  
  /**
   * Admin: Update product
   */
  export const updateProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
  
      res.json(product);
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  };
  
  /*** Admin: Soft delete (inactive)*/
  export const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { status: "inactive" },
        { new: true }
      );
  
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
  
      res.json({ msg: "Product deactivated" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  };