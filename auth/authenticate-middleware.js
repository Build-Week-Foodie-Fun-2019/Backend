const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(
      token,
      'ThisIsFoodieFunApp',
      process.env.NODE_ENV === "development"
        ? process.env.SECRET
        : process.env.SECRET,
      (err, decodedToken) => {
        if (err) {
          res.status(401).json({ message: "shall not pass!" + err.message });
        } else {
          req.decodedToken = decodedToken;
          next();
        }
      }
    );
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
};
