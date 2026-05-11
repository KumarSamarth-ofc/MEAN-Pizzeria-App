const { authenticateJWT } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const express = require("express");
const Pizza = require("../models/Pizza");

const router = express.Router();
const { upload } = require("../middleware/uploadMiddleware");
router.post(
  "/:id/image",
  authenticateJWT,
  authorizeRoles("admin"),
  
  upload.single("image"),
  async (req, res, next) => {
    // req.file.path contains the uploaded file
    const imageUrl = `/uploads/${req.file.filename}`;
    const pizza = await Pizza.findByIdAndUpdate(
      req.params.id,
      { imageUrl },
      {
        new: true,
      },
    );
    res.json(pizza);
  },
);


module.exports = router;