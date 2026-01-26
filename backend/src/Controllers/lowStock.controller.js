import LowStockAlert from "../models/LowStockAertSchema.js";

export const getLowStockAlerts = async (req, res) => {
  try {
    const alerts = await LowStockAlert.find({ status: "active" })
      .populate("product", "name quantity minStock");

    res.json(alerts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
