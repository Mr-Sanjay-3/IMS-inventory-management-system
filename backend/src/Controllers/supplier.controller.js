import Supplier from "../models/Suppliers.js";

/*** Admin: Create supplier*/
export const createSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
/** Admin + Staff: Get all suppliers*/
export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({ status: "active" });
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
/** Admin: Update supplier*/
export const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!supplier) {
      return res.status(404).json({ msg: "Supplier not found" });
    }

    res.json(supplier);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

/*** Admin: Soft delete supplier*/
export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { status: "inactive" },
      { new: true }
    );

    if (!supplier) {
      return res.status(404).json({ msg: "Supplier not found" });
    }

    res.json({ msg: "Supplier deactivated" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
