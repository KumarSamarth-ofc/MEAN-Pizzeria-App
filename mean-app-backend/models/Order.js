const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderItemSchema = new Schema({
  pizza: { type: Schema.Types.ObjectId, ref: "Pizza", required: true },
  toppings: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  quantity: Number,
});

const OrderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [OrderItemSchema],
    total: Number,
    status: { type: String, default: "Pending" }, // e.g. 'Pending', 'Completed'
    address: String,
    paymentMethod: String,
  },
  { timestamps: true },
);


module.exports = mongoose.model("Order", OrderSchema);
