var path = require('path')
const multer = require("multer");
var __basedir = "./app/";
const maxSize = 25 * 1024 * 1024;

function makeid(length) {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
}

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "Image/courseImage");
  },
  filename: (req, file, cb) => {
    if (file.originalname) {
      cb(null, `${Date.now() + makeid(8)}_Course${path.extname(file.originalname)}`);
    } else {
      cb(null, `${Date.now() + makeid(8)}_Course_IMG.jpeg`);
    }
  },
});

// var storage_profile = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, __basedir + "Image/profileImage");
//     },
//     filename: (req, file, cb) => {
//       if (file.originalname) {
//         cb(null, `${Date.now() + makeid(8)}_PROFILE${path.extname(file.originalname)}`);
//       } else {
//         cb(null, `${Date.now() + makeid(8)}_PROFILE_IMG.jpeg`);
//       }
//     },
//   });

var upload = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: imageFilter,
});
module.exports = upload;

// var upload_profile = multer({
//     storage: storage_profile,
//     limits: { fileSize: maxSize },
//     fileFilter: imageFilter,
//   });
//   module.exports = upload_profile;