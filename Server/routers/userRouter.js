const express = require("express");

const {
  verifyUser,
  getUserById,
  getUser,
  signup,
  login,
  deleteUser,
  patchUser,
} = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .all(verifyUser)
  .get(getUser)
  .delete(deleteUser)
  .patch(patchUser); // I don't know if the middleware is implemented correctly here
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
