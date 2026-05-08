const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: String
});

module.exports = mongoose.model("Ingredient", IngredientSchema);