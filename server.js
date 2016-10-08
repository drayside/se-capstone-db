"use strict";

var restify = require('restify');
var bunyan = require('bunyan');
var config = require('./config/default');
var sequelize = require('./config/db')(config);
var models = require('./app/models')(sequelize);
var _ = require('lodash');

// Security layer
var authenticationHelpers = require('./app/common/authentication')(config);

var userHelpers = require('./app/helpers/userHelpers')(models, authenticationHelpers);
var userHandlers = require('./app/routes/userHandlers')(userHelpers);

var passport = require('passport');

// Authentication methods
var strategies = require('./app/authentication/strategies')(userHelpers, authenticationHelpers);

passport.use(strategies.BasicStrategy);
passport.use(strategies.BearerStrategy);

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
server.use(passport.initialize());

server.pre(restify.sanitizePath());
server.use(function (req, res, next) {
    if ((req.method === "PUT" || req.method === "POST") && _.isUndefined(req.body)) {
        req.body = {};
    }
    next();
});

// Routes
server.get('/v1/users/', userHandlers.index); // User route: get all the users
server.get('/v1/user/:id', userHandlers.view); // User route: get user by the id
server.post('/v1/user/create/', userHandlers.createUser); // User route: create a user
server.del('/v1/user/delete/:id', userHandlers.del); // User route: create a user

sequelize.authenticate().then(function () {
    console.log('Connection has been established successfully');
    // use .sync{ force: true } to drop the db and make a new db from the schema
    sequelize.sync().then(function () {
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
