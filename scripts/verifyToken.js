const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(403)
      .send({ status: false, messsage: "No token provided" });
  }
  const bearerToken = token.split(" ")[1];
  jwt.verify(bearerToken, process.env.SECRET_KEY, (err, decodedData) => {
    if (err) {
      return res.status(401).send({ status: false, messsage: "Invalid token" });
    }
    req.userId = decodedData.userId;
    req.email = decodedData.email;
    next();
  });
}

module.exports = verifyToken;
