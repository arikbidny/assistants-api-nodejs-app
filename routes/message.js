const express = require("express");
const router = express.Router();

const { addMessage } = require("../controllers/assistantController");

// Thread routes
router.route("/message").post(addMessage);

module.exports = router;
