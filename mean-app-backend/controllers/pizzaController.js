const Pizza = require("../models/Pizza");
const Category = require("../models/Category");





exports.createPizza = async (req, res, next) => {
  try {
    const { name, description, price, category, isVeg, ingredients, imageUrl } =
      req.body;
    const pizza = new Pizza({
      name,
      description,
      price,
      category,
      isVeg,
      ingredients,
      imageUrl,
    });
    await pizza.save();
    res.status(201).json(pizza);
  } catch (err) {
    next(err);
  }
};



exports.getPizzas = async (req, res, next) => {
  try {
    let query = {};
    if (req.query.category) {
      query.category = req.query.category;
    }
    const pizzas = await Pizza.find(query).populate("category ingredients");
    res.json(pizzas);
  } catch (err) {
    next(err);
  }
};



exports.getPizzaById = async(req, res, next) => {
    try {
        const pizza = await Pizza.findById(req.params.id).populate("category ingredients");
        if (!pizza) {
            return res.status(404).json({ message: "Pizza not found" });
        }
        res.json(pizza);
    } catch (error) {
        next(err);
    }
}

exports.updatePizza = async (req, res, next) => {
  try {
    const pizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!pizza) return res.status(404).json({ message: "Pizza not found" });
    res.json(pizza);
  } catch (err) {
    next(err);
  }
};
exports.deletePizza = async (req, res, next) => {
  try {
    await Pizza.findByIdAndDelete(req.params.id);
    res.json({ message: "Pizza deleted" });
  } catch (err) {
    next(err);
  }
};
