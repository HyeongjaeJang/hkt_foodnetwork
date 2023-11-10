const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  checkauth,
  logout,
  needsAdd,
  changeLoca,
  showProfile,
} = require("../controllers/userController"); // Combine route handlers when possible
const { notification } = require("../controllers/notificationController");

const {
  uploadEvent,
  deleteEvent,
  updateEvent,
} = require("../controllers/eventControllers");
const { upload } = require("../middleware");
const { imgUploadHandler } = require("../controllers/imgUploadController");
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/needs_add").post(needsAdd);
router.route("/profile").get(showProfile);
router.route("/checkauth").post(checkauth);
router.route("/change_location").post(changeLoca);
router.route("/deleteEvent").delete(deleteEvent);
router.route("/updateEvent").put(updateEvent);
router.route("/notification").post(notification);
router.post("/uploadEvent", upload.array("testimg", 6), uploadEvent);

module.exports = router;
