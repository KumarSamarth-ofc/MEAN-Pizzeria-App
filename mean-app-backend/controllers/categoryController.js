const Category = require("../models/Category");


exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};


exports.createCategory = async (req, res, next) => {
try {
    const category = new Category({ name: req.body.name });
    await category.save();
    res.status(201).json(category);
} catch (err) {
    next(err);
}
};
