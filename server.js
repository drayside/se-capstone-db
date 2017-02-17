"use strict";

var restify = require('restify');
var config = require('./config/default');

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

const commandLineArgs = require('command-line-args');
const options = commandLineArgs([
    {name: 'markdown-directory', type: String}
    {name: 'referee-schedule-directory', type: String}
]);

var mdDirAbsPath;//markdown directory absolute path
var refScheduleDirAbsPath; //directory containing referee schedule markdown files

if (options['markdown-directory'] == undefined) {
  if(config.markdownDirectory == undefined) {//no default specified, exit
    console.error("No default found for 'markdown directory' in './config/config.json'!");
    console.error("No '--markdown-directory' option passed to script!");
    //TODO: print usage
    process.exit(1);
  }
  mdDirAbsPath = path.resolve(__dirname, config.markdownDirectory);
  console.log("--- Using default markdown directory path: '%s' ---", mdDirAbsPath);
} else {
  mdDirAbsPath = path.resolve(__dirname, options['markdown-directory']);
  console.log("--- Using specified markdown directory path: '%s' ---", mdDirAbsPath);
}

if (options['referee-schedule-directory'] == undefined) {
  console.log("No '--referee-schedule-directory' option passed to script!");
  //this option is optional
} else {
  refScheduleDirAbsPath = path.resolve(__dirname, options['referee-schedule-directory']);
  var parseRefSchedules = require('./config/script')(refScheduleDirAbsPath);
}



var parse = require('./config/parse')(mdDirAbsPath);//parse module uses markdown directory
var graphGenerator = require('./app/graph/graphGenerator')(parse);
var projectHelpers = require('./app/helpers/projectHelpers')(parse);

var projectHandlers = require('./app/routes/projectHandlers')(projectHelpers, mdDirAbsPath);//constructor sets markdown directory
var server = restify.createServer();

// Log uncaught exceptions
server.on('uncaughtException', function (req, res, route, error) {
    req.log.error(error);
    res.send(500, new Error(error));
});

// Restify config
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
//server.get('/project/html/:projectName', projectHandlers.compileMarkdown); // Project route: get project html file by id
server.get('/graph/generate', projectHandlers.graph); // Project route: get the graph
// server.get('/project/:projectName', projectHandlers.viewProject); // Project route: get project by the id
server.post('/search', projectHandlers.search); // Search route

// Route to get the public files
var serveIndex = function(req, res, next) {
    fs.readFile(path.join(__dirname, 'public/index.html'), 'utf8', function (err, data) {
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(data),
            'Content-Type': 'text/html'
        });
        res.end(data);
        next();
    });
};
server.get('/project/:projectName', serveIndex);
server.get('/graph', serveIndex);
server.get(/\.*/, restify.serveStatic({
    'directory': 'public',
    'default': 'index.html'
}));

server.listen(config.port, function () {
    console.log(' --- Listening to %s --- ', server.url);
});

module.exports = server;
