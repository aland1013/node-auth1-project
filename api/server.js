const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const Users = require('../users/users-model');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

/* ----- GET /api/users ---- */
server.get('/api/users', (req, res) => {
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.send(err));
});

module.exports = server;
