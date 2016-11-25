"use strict";

var _ = require('lodash');
var marked = require('marked');
var httpErrors = require('restify').errors;
var errors = require('../common/errors');
var sendError = require('../common/sendError');
var validateParams = require('../common/validateParams');
var fs = require('fs');
var path = require('path');

module.exports = function (projectHelpers) {

    var allProjects = function allProjects(req, res, next) {
        var p = projectHelpers.getProjects();
        res.json({"projects": p});
        next();
    };

    var viewProject = function viewProject(req, res, next){
        var project = projectHelpers.getProject(req.params.projectName);
        var result = {};
        result[req.params.projectName] = project;
        res.json(result);
        next();
    };

    var compileMarkdown = function compileMarkdown(req, res, next){
        var projectName = req.params.projectName;
        fs.readFile(path.join(__dirname, '../../config/markdown/' + projectName), 'utf8', function (err, data) {
            if (err) {
                return res.send(500, "Unable to open project file.");
            }
            var body = marked(data);
            res.writeHead(200, {
                'Content-Length': Buffer.byteLength(body),
                'Content-Type': 'text/html'
            });
            res.end(body);
            next();
        });
    };

    var search = function search(req, res, next) {
        validateParams([
            {name: 'first_name', in: req.body, required: true},
            {name: 'last_name', in: req.body, required: true},
            {name: 'email', in: req.body, required: true},
            {name: 'username', in: req.body, required: true},
            {name: 'password', in: req.body, required: true},
        ]).then(function () {
            var userInfo = _.pick(
                req.body,
                'first_name',
                'last_name',
                'email',
                'username',
                'password'
            );
            projectHelpers.createUser(userInfo)
                .then(function (user) {
                    listHelpers.createList(user, {
                        "name": "Grocery List",
                        "description": "Default shopping list.",
                    }).then(function(list){
                        user.addList(list);
                        res.json(201, user);
                        next();
                    });
                }).catch(errors.UserExistsError, sendError(httpErrors.ConflictError, next));
        }).catch(errors.ValidationError, sendError(httpErrors.NotFoundError, next));
    };

    var graph = function graph(req, res, next) {
        var min, max;
        if (parseInt(req.query.min) != NaN) {
            min = parseInt(req.query.min);
        }
        if (parseInt(req.query.max) != NaN) {
            max = parseInt(req.query.max);
        }
        projectHelpers.getGraph(function(graph) {
            res.writeHead(200, {'Content-Type': 'image/svg+xml'});
            res.end(graph);
            next();
        }, min, max);
    };

    return {
        graph: graph,
        allProjects: allProjects,
        search: search,
        viewProject: viewProject,
        compileMarkdown: compileMarkdown
    };
};
