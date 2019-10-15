const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');// session middleware

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfiguration = {
  name: 'ohfosho',// defualt would be "sid"
  secret: 'keep it secret, keep it safe!',// should be set in enviroment with enviroment variable for this to keep it dynamic
  cookie: {
    httpOnly: true, // 35 cannot access the cookies
    maxAge: 1000 * 60 * 60, //expiration time in milliseconds
    secure: false,
    // secure: process.env.NODE_ENV === production ? true: false // use cookies over HTTPS only, should be true in production
  },
  resave: false,
  saveUninitialized: true, //read about GDPR complaince, false default, have client send message about do you want to save cookies. currently set to true for developement 
};

//global middleware
server.use(sessions(sessionConfiguration));// turn on sessions support
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
