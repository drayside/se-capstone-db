"use strict";

var _ = require('lodash');
var httpErrors = require('restify').errors;
var errors = require('../common/errors');
var sendError = require('../common/sendError');
var validateParams = require('../common/validateParams');

module.exports = function (listHelpers) {

    var index = function index(req, res, next) {
        listHelpers.getLists(req.user)
            .then(function(lists){
                res.json(200, {
                    "lists": lists
                });
                next();
            });

    };

    var view = function view(req, res, next) {

    };

    var createList = function createList(req, res, next) {

    };

    var del = function del(req, res, next) {

    };

    return {
        index: index,
        view: view,
        createList: createList,
        del: del
    };
};
