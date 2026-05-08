const express = require('express');
const router = express.Router();
const { authenticateJWT, } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { getIngredients, createIngredient } = require('../controllers/ingredientController');

router.get('/', getIngredients);
router.post('/', authenticateJWT, authorizeRoles('admin'), createIngredient);

module.exports = router;
