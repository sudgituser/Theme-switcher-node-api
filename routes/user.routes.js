
const controller = require("../controllers/user.controller");
const authjwt = require("../middleware/authJwt");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.get("/api/test/all", controller.allAccess);
  app.get("/")

  app.post("/api/theme/updatetheme",authjwt.verifyToken, controller.updatetheme);


  
};