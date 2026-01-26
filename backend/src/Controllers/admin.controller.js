import Product from "../models/Product.js";
import Alert from "../models/LowStockAertSchema.js";
import User from "../models/Users.js";

export const getAdminStatus = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const lowStockAlerts = await Alert.countDocuments({ isResolved: false });
    const totalUsers = await User.countDocuments();

    res.json({
      totalProducts,
      lowStockAlerts,
      totalUsers,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
