const express = require("express");
const { sendContactFormInfo } = require("../controllers/contactController");

const router = express.Router();

router.route("/").post(sendContactFormInfo);

module.exports = router;
