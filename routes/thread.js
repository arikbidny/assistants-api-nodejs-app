const express = require("express");
const router = express.Router();

const { createThread } = require("../controllers/assistantController");

// Thread routes
router.route("/thread").post(createThread);

module.exports = router;
