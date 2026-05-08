const express = require("express");
const router = express.Router();
const {
    authenticateJWT, } = require("../middleware/authMiddleware");
    
const { authorizeRoles } = require("../middleware/roleMiddleware");
const {
  createCategory,
  getCategories,
} = require("../controllers/categoryController");
router.get("/", getCategories);
router.post("/", authenticateJWT, authorizeRoles("admin"), createCategory);
module.exports = router;
