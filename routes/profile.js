const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

// Create a profile
router.post("/create", profileController.createProfile);

//get all  profiles
router.get("/all", profileController.getAllProfile);

// Get a profile
router.get("/:userId", profileController.getProfile);

// Update a profile
router.put("/:userId", profileController.updateProfile);
router.patch("/:userId", profileController.updateProfile);

// Delete a profile
router.delete("/:userId", profileController.deleteProfile);

module.exports = router;
