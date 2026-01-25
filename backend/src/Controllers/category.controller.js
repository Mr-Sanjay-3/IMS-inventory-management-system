import Category from "../models/Category.js";
import Product from "../models/Product.js";

/** Admin: Create category */
export const createCategory = async (req, res) => {
  try {
    const exists = await Category.findOne({ name: req.body.name });
    if (exists) {
      return res.status(400).json({ msg: "Category already exists" });
    }
    const category = await Category.create({
      name: req.body.name,
      description: req.body.description
    });

    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

/**Both Admin &Staff: Get categories */
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ status: "active" });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/** Admin: Update category */
export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description
      },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json(category);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

/** Admin: Soft delete category */
export const deleteCategory = async (req, res) => {
  try {
    const used = await Product.exists({ category: req.params.id });
    if (used) {
      return res.status(400).json({
        msg: "Cannot deactivate category in use by products"
      });
    }

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { status: "inactive" },
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.json({ msg: "Category deactivated" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
