const express = require("express");
const router = express.Router();
const { authenticateJWT } = require("../middleware/authMiddleware");
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");


router.get("/", authenticateJWT, getCart);
router.post("/add", authenticateJWT, addToCart);
router.put("/item/:itemId", authenticateJWT, updateCartItem);
router.delete("/item/:itemId", authenticateJWT, removeCartItem);
router.delete("/", authenticateJWT, clearCart);


module.exports = router;
