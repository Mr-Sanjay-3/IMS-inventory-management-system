import Alert from "../models/LowStockAertSchema";

export const checkLowStock = async (product) =>{
    if (product.quantitiy <= product.minStock) {
        await Alert.findOneAndUpdate(
            {product: product._id},
            {
                product : product._id,
                msg: `Low stock alert: ${product.name} (${product.quantitiy} left)`,
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