const express = require("express");
const { sendContactFormInfo } = require("../controllers/contactController");

// Get routes from userController.js

const router = express.Router();

router.route("/").post(sendContactFormInfo);

module.exports = router;
