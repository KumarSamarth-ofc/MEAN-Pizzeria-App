const mongoose = require("mongoose");
const { Schema } = mongoose;

const CartItemSchema = new Schema({
  pizza: { type: Schema.Types.ObjectId, ref: "Pizza", required: true },
  toppings: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  quantity: { type: Number, default: 1 },
});

const CartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [CartItemSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Cart", CartSchema);
