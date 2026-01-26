import LowStockAlert from "../models/LowStockAlert.js";

export const checkLowStock = async (product) => {
  if (product.quantity <= product.minStock) {
    await LowStockAlert.findOneAndUpdate(
      { product: product._id },
      {
        product: product._id,
        currentQuantity: product.quantity,
        minStock: product.minStock,
        status: "active"
      },
      { upsert: true, new: true }
    );
  } else {
    await LowStockAlert.findOneAndUpdate(
      { product: product._id },
      { status: "resolved" }
    );
  }
};
