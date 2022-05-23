const  verifySignUp = require("../middleware/verifySignUp");
const controller = require("../controllers/auth.controller");
const usercontroller = require("../controllers/user.controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup",
      verifySignUp.checkDuplicateUsernameOrEmail
    ,
    controller.signup
  );
  app.post("/api/auth/signin",usercontroller.gettheme, controller.signin);
};