const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/authenticate-middleware");
const authRouter = require("../auth/auth-router");
const userRouter = require("../users/userRouter");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", logger, (req, res) => {
  res.send("It's Alive!!!");
});

server.use("/api/auth", logger, authRouter);
server.use("/api/users", logger, authenticate, userRouter);

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.host}`
  );

  next();
}
module.exports = server;
