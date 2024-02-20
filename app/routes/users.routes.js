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


app.get("/api/users/all",  controller.usersAll);
app.get("/api/users/id/:user_id", controller.get_userById);



  
  

};