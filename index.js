require('dotenv').config()

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


const server = express();
server.use(helmet());
const port = process.env.PORT;
const foodies = [
    {id:1, name:'Ifiok'},
    {id:2, name:'Kayla'},
    {id:3, name:'Blake'},
];

server.use(express.json());
server.use(cors());


server.get('/', (req, res) => {
 res.send("<h1>Welcome to Foodie Fun!</h1>")
})
server.get('/api/foodies', (req, res, next) => {
  res.json(foodies);
});

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`)
})