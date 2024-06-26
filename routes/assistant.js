const express = require("express");
const router = express.Router();

// Import the assistant controller methods
const {
  createAssistant,
  getAssistant,
  createDynamicAssistant,
} = require("../controllers/assistantController");

// Assistant routes
router.route("/assistant").post(createAssistant);
router.route("/assistant").get(getAssistant);
router.route("/dynamic-assistant").post(createDynamicAssistant);

module.exports = router;
