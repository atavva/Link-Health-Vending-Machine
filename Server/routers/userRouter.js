const express = require("express");

const {
  verifyUser,
  getUserById,
  signup,
  login,
  deleteUser,
  patchUser,
} = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .all(verifyUser)
  .get(getUserById)
  .delete(deleteUser)
  .patch(patchUser); // I don't know if the middleware is implemented correctly here
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
