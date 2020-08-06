const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const usersRouter = require('../users/users-router');

const server = express();

const sessionConfig = {
  name: 'nom-nom-nom',
  secret: 'shhh',
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  store: new KnexSessionStore({
    knex: require('../data/db-config'),
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));

// global middleware on /api/users for stretch
server.use('/api/users', (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(403).json({ message: 'not authorized' });
  }
});

server.use('/api', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
