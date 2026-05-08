const express = require("express");
const router = express.Router();

const {
  authorizeRoles,
  authenticateJWT,
} = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const {
  createPizza,
  getPizzas,
  getPizzaById,
  updatePizza,
  deletePizza,
} = require("../controllers/pizzaController");

router.get("/", getPizzas);
// Public: get pizza details
router.get("/:id", getPizzaById);
// Admin-only routes:
router.post("/", authenticateJWT, authorizeRoles("admin"), createPizza);
router.put("/:id", authenticateJWT, authorizeRoles("admin"), updatePizza);
router.delete("/:id", authenticateJWT, authorizeRoles("admin"), deletePizza);
module.exports = router;