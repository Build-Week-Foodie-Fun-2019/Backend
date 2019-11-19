const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware')
const authRouter = require('../auth/auth-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());


// const foodies = [
//   { id: 1, name: 'Ifiok' },
//   { id: 2, name: 'Kayla' },
//   { id: 3, name: 'Blake' },
// ];

// server.use(express.json());
// server.use(cors());


// server.get('/', logger, (req, res) => {
//   res.send("<h1>Welcome to Foodie Fun!</h1>")
// })
// server.get('/api/foodies', logger, (req, res, next) => {
//   res.json(foodies);
// });


// function logger(req, res, next) {
//   console.log(
//     `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.host}`
//   );

//   next();
// }
module.exports = server;