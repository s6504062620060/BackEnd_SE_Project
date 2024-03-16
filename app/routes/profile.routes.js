const controller = require("../controllers/profile.controller");
const { authJwt } = require("../middleware");
const express = require('express')
const multer  = require('multer')
const upload = require("../multer_controller/multer");




module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get("/api/profile/getProfile",
    [authJwt.verifyToken],
    authJwt.SaveLogs("Get Profile"),
    controller.getProfile);


    app.post("/api/profile/updatePassword", 
    [authJwt.verifyToken],
    authJwt.SaveLogs("Update Password"),
    controller.updatePassword);

    
    app.post("/api/profile/updateProfile",
    [authJwt.verifyToken],
    authJwt.SaveLogs("Update Profile"),
    controller.updateProfile
);

    app.get("/api/profile/get_img",
    [authJwt.verifyToken],
    authJwt.SaveLogs("Get Image Profile"),
    controller.get_img);

    app.post("/api/profile/upload_img",
    [authJwt.verifyToken],
    upload.single('file'),
    authJwt.SaveLogs("Upload Image Profile"),
    controller.upuploadImage);













};