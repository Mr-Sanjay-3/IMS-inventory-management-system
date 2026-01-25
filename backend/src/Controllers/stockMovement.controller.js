import Product from "../models/Product.js";
import StockMovement from "../models/StockMovement.js";
//Stock In
export  const stockIn  = async (req, res)=>{
    try{
        const {productId, quantity, note } = req.body;
        const product = await Product.findById(productId);
        if(!product) {
            return res.status(404).json({ msg: "Product not found" });
        }
    
        // Update product quantity
        product.quantity += quantity;
        await product.save();
    
        // Record the movement
        await StockMovement.create({
          product: productId,
          type: "IN",
          quantity,
          performedBy: req.user.id,
          note,
        });
    
        res.json({ msg: "Stock added successfully", product });
      } catch (err) {
        console.error(err);
        res.status(400).json({ msg: err.message });
      }
    };
    
    // Stock OUT
    export const stockOut = async (req, res) => {
      try {
        const { productId, quantity, note } = req.body;
    
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ msg: "👻Product not found" });
    
        if (product.quantity < quantity)
          return res.status(400).json({ msg: "Insufficient stock" });
        // Update product quantity
        product.quantity -= quantity;
        await product.save();
    
        // Record the movement
        await StockMovement.create({
          product: productId,
          type: "OUT",
          quantity,
          performedBy: req.user.id,
          note,
        });
    
        // Optional low-stock alert
        if (product.quantity <= product.lowStockThreshold) {
          console.log(`💀 Low stock alert for ${product.name}`);
        }
    
        res.json({ msg: "Stock removed successfully", product });
      } catch (err) {
        console.error(err);
        res.status(400).json({ msg: err.message });
      
    };
    }