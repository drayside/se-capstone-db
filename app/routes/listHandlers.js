"use strict";

var _ = require('lodash');
var httpErrors = require('restify').errors;
var errors = require('../common/errors');
var sendError = require('../common/sendError');
var validateParams = require('../common/validateParams');

module.exports = function (listHelpers) {

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
    var createList = function createList(req, res, next) {

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

    };

    return {
        index: index,
        view: view,
        createList: createList,
        del: del
    };
};
