import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Alert from '../models/LowStockAertSchema.js';
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

    // LOW STOCK CHECK
    const LOW_STOCK_LIMIT = product.lowStockThreshold;

    if (product.quantity <= LOW_STOCK_LIMIT) {
      await Alert.findOneAndUpdate(
        { product: product._id },
        {
          product: product._id,
          message: `${product.name} is low on stock (${product.quantity} left)`,
          isResolved: false,
        },
        { upsert: true, new: true }
      );
    } else {
      // If stock is refilled, resolve existing alert automatically
      await Alert.findOneAndUpdate(
        { product: product._id },
        { isResolved: true }
      );
    }

    res.json(product);

  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
  
  /*** Admin:  delete */
  export const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id );
  
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
      res.status(200).json({ msg: "Product deleted" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
    
  };
   //Catogory History
  export const getProductsByCategoryName = async (req, res) => {
  try {
    // Find category by name
    const category = await Category.findOne({
      name: req.params.categoryName
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    //Find products with that category ID
    const products = await Product.find({
      category: category._id
    }).populate("category");

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};