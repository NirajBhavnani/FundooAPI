require("dotenv/config");
const jwt = require("jsonwebtoken");

let authMiddleware = {
  createToken(_req, _res, _object) {
    const accessToken = jwt.sign(
      {id: this._object}, //passing it as a json object since : Set the payload as an object if you want to be able to set the expiresIn option
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "24h"}
    );
    _res.user = _object;
    _req.accessToken = accessToken;
  },

  authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(authHeader);

    if (token == null)
      return res.status(401).json({ message: "User have no access" }); //401: Token not sent

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); //403: Token no longer valid and you don't have access
      req.user = user;
      next();
    });
  },
};

module.exports = authMiddleware;
