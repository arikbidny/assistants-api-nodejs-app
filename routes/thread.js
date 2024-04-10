const express = require("express");
const router = express.Router();

const { createThread } = require("../controllers/assistantController");

// Thread routes
router.route("/thread").get(createThread);

module.exports = router;
