const express = require("express");
const {
  determineNextQuestion,
  getFieldNames,
  getAllQuestions,
} = require("../controllers/eligibilityController");

const router = express.Router();

router.route("/").get(getFieldNames).post(determineNextQuestion);
router.route("/questions").get(getAllQuestions);

module.exports = router;
