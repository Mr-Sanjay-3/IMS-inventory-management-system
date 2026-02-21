import API from "./axios";

// CREATE
export const createProduct = (data) =>
  API.post("/product", data);

// READ ALL PRODUCTS
export const getProduct = () =>
  API.get("/product");

// UPDATE
export const updateProduct = (id, data) =>
  API.put(`/product/${id}`, data);

// DELETE
export const deleteProduct = (id) =>
  API.delete(`/product/${id}`);

// GET ALL CATEGORIES
export const getCategories = () =>
  API.get("/category");

// GET CATEGORY BY ID
export const showCategoryById = (categoryId) =>
  API.get(`/category/${categoryId}`);

// GET PRODUCTS BY CATEGORY NAME
export const showProductsByCategoryName = (categoryName) =>
  API.get(`/product/name/${encodeURIComponent(categoryName)}`);