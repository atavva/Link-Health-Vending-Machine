const express = require("express");
const { determineNextQuestion } = require("../controllers/eligibilityController");

const router = express.Router();

router.route("/").post(determineNextQuestion);

module.exports = router;
