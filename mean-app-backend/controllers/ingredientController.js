const Ingredient = require("../models/Ingredient");


exports.getIngredients = async (req, res, next) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (err) {
    next(err);
  }
};


exports.createIngredient = async (req, res, next) => {
  try {
    const { name, price, imageUrl } = req.body;
    const ing = new Ingredient({ name, price, imageUrl });
    await ing.save();
    res.status(201).json(ing);
  } catch (err) {
    next(err);
  }
};
