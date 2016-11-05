"use strict";

var _ = require('lodash');
var httpErrors = require('restify').errors;
var errors = require('../common/errors');
var sendError = require('../common/sendError');
var validateParams = require('../common/validateParams');

module.exports = function (projectHelpers) {

    /*
    Request:
        params: all
        header:
        body: {}
    Response:
        Success:
        200 - Success
        body: {
                projects: [
                    {
                        "name": [STRING],
                        "year": [STRING],
                        "abstract": [STRING],
                        "pid": [INT]
                    },
                ]
            }
        Failure: {404: 'NotFoundError'}
    */
    var allProjects = function allProjects(req, res, next) {
        projectHelpers.getProjects().then(function (projects) {
            res.json({"projects": projects});
            next();
        });
    };

    /*
    Request:
        params: id of the required project
        header:
        body: {}
    Response:
        Success:
        200 - Success
        body: {
            "id": [INTEGER],
            "name": [STRING],
            "students": [STRING],
            "year" : [INTEGER],
            "status" : [STRING],
            "tags" : [STRING],
            "abstract" : [STRING],
            "external_partners" : [STRING]
        }
        Failure:
        404 - NotFoundError
    */

    var userById = function userById(req, res, next) {
        projectHelpers.getProjectById(req.params.id).then(function (project) {
            res.json({ project });
            next();
        }).catch(errors.ProjectNotFoundError, sendError(httpErrors.NotFoundError, next));
    };

    /*
    Request:
        params:
        header:
        body: {
            "name": [STRING],
            "status": [STRING],
            "tags": [STRING],
            "year": [STRING]
        }
    Response:
        Success:
        201 - Success
        body: {
            projects: [
                {
                    "name": [STRING],
                    "year": [STRING],
                    "abstract": [STRING],
                    "pid": [INT]
                },
            ]
        }
        Failure:
        400 - BadRequest
    */

    // TODO

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

    return {
        allProjects: allProjects,
        userById: userById,
        search: search,
    };
};
