"use strict";

var restify = require('restify');
var bunyan = require('bunyan');
var config = require('./config/default');
var parse = require('./config/parse');
var sequelize = require('./config/db')(config);
var models = require('./app/models')(sequelize);
var _ = require('lodash');

var graphGenerator = require('./app/graph/graphGenerator')(parse);
var projectHelpers = require('./app/helpers/projectHelpers')(models);
var projectHandlers = require('./app/routes/projectHandlers')(projectHelpers);

graphGenerator.generateGraph();

var restifyLogger = new bunyan({
    name: 'restify',
    streams: [
        {
            level: 'error',
            stream: process.stdout
        },
        {
            level: 'info',
            stream: process.stdout
        }
    ]
});

var server = restify.createServer({
    log: restifyLogger,
});

// Add audit logging
server.on('after', restify.auditLogger({
    log: restifyLogger
}));

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
server.get('/project/:id', projectHandlers.userById); // Project route: get project by the id
server.post('/search', projectHandlers.search); // Search route

sequelize.authenticate().then(function () {
    console.log('Connection has been established successfully');
    // use .sync{ force: true } to drop the db and make a new db from the schema
    sequelize.sync().then(function () {
    // sequelize.sync({force: true}).then(function () {
        server.listen(config.port, function () {
            console.log(' --- Listening to %s --- ', server.url);
        });
    });
}).catch(function (err) {
    console.log('Unable to connect to db: ', err);
});

server.db = {};
server.db.sequelize = sequelize;
server.db.models = models;
module.exports = server;
