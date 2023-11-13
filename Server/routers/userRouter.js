const express = require("express");

const {
  verifySession,
  patchEligibility,
  patchEligiblePrograms,
  patchRegisteredPrograms,
  deleteEligibility,
  deleteEligiblePrograms,
  deleteRegisteredPrograms,
  getUser,
  signup,
  login,
  deleteUser,
  verifyAdmin,
  adminGetUsers,
  adminUpdateRegisteredPrograms,
} = require("../controllers/userController");

const router = express.Router();

router.route("/").all(verifySession).get(getUser).delete(deleteUser);

router
  .route("/eligibility")
  .all(verifySession)
  .patch(patchEligibility)
  .delete(deleteEligibility);

router
  .route("/eligible-programs")
  .all(verifySession)
  .patch(patchEligiblePrograms)
  .delete(deleteEligiblePrograms);

router
  .route("/registered-programs")
  .all(verifySession)
  .patch(patchRegisteredPrograms)
  .delete(deleteRegisteredPrograms);

router.route("/admin").all(verifySession, verifyAdmin).get(adminGetUsers);

router
  .route("/admin/:id")
  .all(verifySession, verifyAdmin)
  .patch(adminUpdateRegisteredPrograms);

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
