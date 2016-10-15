"use strict";

var _ = require('lodash');
var httpErrors = require('restify').errors;
var errors = require('../common/errors');
var sendError = require('../common/sendError');
var validateParams = require('../common/validateParams');

module.exports = function (userHelpers) {

    /*
    Request:
        params:
        header: admin_token
        body: {}
    Response:
        Success:
        200 - Success
        body: {
            users: [
                {
                    "id": [INTEGER],
                    "name": [STRING],
                    "email": [STRING],
                    "updatedAt": [STRING],
                    "createdAt": [STRING]
                },
            ]
        }
        Failure:
    */
    var index = function index(req, res, next) {
        userHelpers.getUsers().then(function (users) {
            res.json({"users": users});
            next();
        });
    };

    /*
    Request:
        params: id of target user
        header: admin_token
        body: {}
    Response:
        Success:
        200 - Success
        body: {
            "id": [INTEGER],
            "name": [STRING],
            "email": [STRING],
            "updatedAt": [STRING],
            "createdAt": [STRING]
        }
        Failure:
        404 - NotFoundError
    */
    var view = function view(req, res, next) {
        // req.user would have had a value but authentication is turned off. Thus that cb is not
        // hit.
        // TODO: Validate params
        userHelpers.getUserByFilter({id: req.params.id}).then(function(user){
            console.log("user", user);
            res.json(200, user);
            next();
        }).catch(errors.UserNotFoundError, sendError(httpErrors.NotFoundError, next));
    };

    /*
    Request:
        params:
        header: admin_token
        body: {
            "first_name": [STRING],
            "last_name": [STRING],
            "email": [STRING],
            "username": [STRING],
            "password": [STRING],
        }
    Response:
        Success:
        200 - Success
        body: {
            "id": [INTEGER],
            "first_name": [STRING],
            "last_name": [STRING],
            "email": [STRING],
            "username": [STRING],
            "updatedAt": [STRING],
            "createdAt": [STRING]
        }
        Failure:
        409 - ConflictError
    */
    var createUser = function createUser(req, res, next) {
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
            userHelpers.createUser(userInfo)
                .then(function (user) {
                    res.json(201, user);
                    next();
                })
                .catch(errors.UserExistsError, sendError(httpErrors.ConflictError, next));
        }).catch(errors.ValidationError, sendError(httpErrors.NotFoundError, next));
    };

    /*
    Request:
        params: id of user to be deleted
        header: admin_token
        body: {}
    Response:
        Success:
        204 - No content
        Failure:
        401 - UnauthorizedError
        403 - ForbiddenError
        body: {}
    */
    var del = function del(req, res, next) {
        userHelpers.deleteUser(req.params.id)
            .then(function () {
                res.send(204);
                next();
            });
    };

    return {
        index: index,
        view: view,
        createUser: createUser,
        del: del
    };
};
