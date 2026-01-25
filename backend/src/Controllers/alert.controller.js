import Alert from "../models/Alert.js";

export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find({ isResolved: false })
      .populate("product", "name quantity minStock");

    res.json(alerts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};