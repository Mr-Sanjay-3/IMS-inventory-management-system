import Alert from "../models/LowStockAertSchema.js";

export const checkLowStock = async (product) =>{
    if (product. quantity <= product.minStock) {
        await Alert.findOneAndUpdate(
            {product: product._id},
            {
                product : product._id,
                msg: `Low stock alert: ${product.name} (${product. quantity} left)`,
                isResolved:false
            },
            {upsert : true , new: true}
        );
    }else{
        await Alert.findOneAndUpdate(
            {product: product._id},
            {isResolved : true}
        );
    }
}