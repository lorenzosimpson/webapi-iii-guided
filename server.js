const express = require('express'); // importing a CommonJS module
const helmet = require('helmet')
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

const dateLogger = (req, res, next) => {
  console.log(new Date().toISOString());
  next()
}

const logData = (req, res, next) => {
  console.log(`${req.method}, ${req.url}`)
  next()
}

// ==== GLOBAL MIDDLEWARE ====
server.use(helmet())
server.use(express.json());
server.use(dateLogger)
server.use(logData);

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
