const multer = require("multer");

exports.upload = multer({
  dest: "assets/",
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "assets/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});
