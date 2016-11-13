"use strict";

var restify = require('restify');
var config = require('./config/default');
var parse = require('./config/parse');
var _ = require('lodash');

var graphGenerator = require('./app/graph/graphGenerator')(parse);
var projectHelpers = require('./app/helpers/projectHelpers')(parse);
var projectHandlers = require('./app/routes/projectHandlers')(projectHelpers);

graphGenerator.generateGraph();

var server = restify.createServer();

// Log uncaught exceptions
server.on('uncaughtException', function (req, res, route, error) {
    req.log.error(error);
    res.send(500, new Error(error));
});

// Restify config
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.opts(/\.*/, function (req, res, next) {
    res.send(200);
    next();
});

server.pre(restify.sanitizePath());
server.use(function (req, res, next) {
    if ((req.method === "PUT" || req.method === "POST") && _.isUndefined(req.body)) {
        req.body = {};
    }
    next();
});

// Routes
// User
server.get('/project/all', projectHandlers.allProjects); // Project route: get all projects
server.get('/project/:projectName', projectHandlers.viewProject); // Project route: get project by the id
server.post('/search', projectHandlers.search); // Search route

server.listen(config.port, function () {
    console.log(' --- Listening to %s --- ', server.url);
});

module.exports = server;
