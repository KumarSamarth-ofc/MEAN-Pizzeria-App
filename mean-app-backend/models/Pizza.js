const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    isVeg: { type: Boolean, default: false },
    imageUrl: String,
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" }],
  },
  { timestamps: true },
);



module.exports = mongoose.model("Pizza", PizzaSchema);