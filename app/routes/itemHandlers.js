"use strict";

var _ = require('lodash');
var httpErrors = require('restify').errors;
var errors = require('../common/errors');
var sendError = require('../common/sendError');
var validateParams = require('../common/validateParams');

module.exports = function (listHelpers, itemHelpers) {

    var addItem = function addItem(req, res, next) {
        validateParams([
            {name: 'item', in: req.body, required: true},
        ]).then(function () {
            listHelpers.getListById(req.user, req.params.listId).then(function(lists) {
                if (lists.length == 0) {
                    throw new errors.ListNotFoundError(req.params.listId);
                } else {
                    var list = lists[0];
                    var itemInfo = req.body.item;
                    itemHelpers.getItemByName(list, itemInfo.name).then(function(items){
                        if (items.length != 0){
                            throw new errors.DuplicateItemError(itemInfo.name);
                        } else {
                            itemHelpers.createItem(itemInfo).then(function(item){
                                list.addItem(item).then(function(){
                                    listHelpers.getListById(req.user, req.params.listId).then(function(lists){
                                        if (lists.length == 0){
                                            throw new errors.ListNotFoundError(req.params.listId);
                                        } else {
                                            res.json(200, {"list": lists[0]});
                                            next();
                                        }
                                    }).catch(errors.ListNotFoundError, sendError(httpErrors.NotFoundError, next));
                                });
                            });
                        }
                    }).catch(errors.DuplicateItemError, sendError(httpErrors.NotFoundError, next));
                }
            }).catch(errors.ListNotFoundError, sendError(httpErrors.NotFoundError, next));
        });
    };

    var deleteItem = function deleteItem(req, res, next){
        listHelpers.getListById(req.user, req.params.listId)
            .then(function(lists) {
                if (lists.length == 0){
                    throw new errors.ListNotFoundError(req.params.listId);
                } else {
                    itemHelpers.getItemById(lists[0], req.params.itemId)
                        .then(function(items){
                            if (items.length == 0){
                                throw new errors.ItemNotFoundError(req.params.itemId);
                            } else {
                                items[0].destroy().then(function(){
                                    listHelpers.getListById(req.user, req.params.listId).then(function(lists){
                                        res.json(200, {"list": lists[0]});
                                        next();
                                    });
                                });
                            }
                        }).catch(errors.ItemNotFoundError, sendError(httpErrors.NotFoundError, next));
                }
            }).catch(errors.ListNotFoundError, sendError(httpErrors.NotFoundError, next));
    };

    return {
        addItem: addItem,
        deleteItem: deleteItem
    };
};
