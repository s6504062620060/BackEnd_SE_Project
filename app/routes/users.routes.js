const controller = require("../controllers/users.controller");
const { authJwt } = require("../middleware");



module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

 app.get("/api/users/getUser", 
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.get_user);


  app.post("/api/users/updateUser",
  [authJwt.verifyToken, authJwt.isAdmin],
  authJwt.SaveLogs("แก้ไขข้อมูลผู้ใช้โดย admin"),
  controller.update_user);

  app.delete("/api/users/deleteUser/:user_id",
  [authJwt.verifyToken, authJwt.isAdmin],
  authJwt.SaveLogs("ลบผู้ใช้โดย admin"),
  controller.delete_user);  


  app.post("/api/users/createUser",
  [authJwt.verifyToken, authJwt.isAdmin],
  authJwt.SaveLogs("สร้างผู้ใช้โดย admin"),
  controller.create_user);
  



  
  

};