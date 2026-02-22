import Alert from '../models/LowStockAertSchema.js'; // Correct the import name

// Fetch low stock alerts
export const getLowStockAlerts = async (req, res) => {
  try {
    // Fetch unresolved low-stock alerts
    const alerts = await Alert.find({ isResolved: false }).populate("product");
    res.json({ alerts });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: err.message });
  }
};

// Mark alert as resolved
export const resolveLowStockAlert = async (req, res) => {
  try {
    const { alertId } = req.params;

    const alert = await Alert.findById(alertId);
    if (!alert) return res.status(404).json({ msg: "Alert not found" });

    alert.isResolved = true;
    await alert.save();

    res.json({ msg: "Low stock alert resolved", alert });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: err.message });
  }
};