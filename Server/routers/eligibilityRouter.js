const express = require("express");
const { determineNextQuestion, getFieldNames } = require("../controllers/eligibilityController");

const router = express.Router();

router.route("/").get(getFieldNames).post(determineNextQuestion);

module.exports = router;