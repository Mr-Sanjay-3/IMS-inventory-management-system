import Staff from '../models/StaffSchema.js';
// Get All Staff
export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find();
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Staff
export const createStaff = async (req, res) => {
  try {
    const newStaff = await Staff.create(req.body);
    res.status(201).json(newStaff);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Staff
export const updateStaff = async (req, res) => {
  try {
    const updated = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Staff
export const deleteStaff = async (req, res) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Staff deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};