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
        listHelpers.getListById(req.user, req.params.listId)
            .then(function(lists){
                if (lists.length == 0){
                    throw new errors.ListNotFoundError(req.params.listId);
                } else {
                    res.json(200, {"list": lists[0]});
                    next();
                }
            }).catch(errors.ListNotFoundError, sendError(httpErrors.NotFoundError, next));
    };

    var createList = function createList(req, res, next) {
        validateParams([
            {name: 'name', in: req.body, required: true},
            {name: 'description', in: req.body, required: true},
        ]).then(function () {
            var listInfo = _.pick(
                req.body,
                'name',
                'description'
            );
            listHelpers.createList(req.user, listInfo)
                .then(function(list){
                    res.json(201, list);
                    next();
                }).catch(errors.DuplicateListError, sendError(httpErrors.ConflictError, next));
        });
    };

    var del = function del(req, res, next) {
        req.user.getLists({where: {id: req.params.listId}})
            .then(function(lists){
                if (lists.length == 0){
                    throw new errors.ListNotFoundError(req.params.listId);
                } else {
                    lists[0].destroy()
                        .then(function(){
                            res.json(204);
                            next();
                        });
                }
            }).catch(errors.ListNotFoundError, sendError(httpErrors.NotFoundError, next));
    };

    return {
        index: index,
        view: view,
        createList: createList,
        del: del
    };
};
