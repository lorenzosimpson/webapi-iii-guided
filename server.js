const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');
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

// === AUTHENTICATOR FUNCTION ===
const gateKeeper = (req, res, next) => {
  // data can come in url, body, query string, headers (key: value store)
  // coming from the header to deal with requests other than Post or Put
  const password = req.headers.password;

  !password ? res.status(400).json({ message: 'Please provide a password'})

  :

  password.toLowerCase() === 'mellon' ? next()
  : 
  res.status(401).json({ message: 'You shall not pass!'})
}
// ==== GLOBAL MIDDLEWARE ====
server.use(gateKeeper)
server.use(helmet())
server.use(express.json());
server.use(dateLogger)
server.use(logData);
server.use(morgan('dev'))

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;
