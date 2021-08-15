const express = require('express');
const { logger } = require('./projects/projects-middleware');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
const actionRouter = require('./actions/actions-router');
// Build your projects router in /api/projects/projects-router.js
const projectRouter = require('./projects/projects-router');
// Do NOT `server.listen()` inside this file!

server.use(express.json());
server.use(logger);
server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

server.get('/', (req,res) => {
  res.status(200).send(`<h1> Let's write some code! YAY!<h1>`);
});

server.use(function (req,res) {
  res.status(400).send(`We don't have time for this. Give a real page!`);
});


module.exports = server;
