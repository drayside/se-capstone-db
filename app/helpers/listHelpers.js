"use strict";

var _ = require('lodash');
var errors = require('../common/errors');
var Promise = require('bluebird');

module.exports = function (models, authenticationHelpers) {

    // Returns lists for the given user
    var getLists = function getLists(user) {
        return user.getLists(function(lists){
            return lists;
        });
    };

    // Expects a list where the name is not already existing:
    // {
    //     "list": {
    //         "name": "List Name",
    //         "description": "List description"
    //     }
    // }
    var createList = function createList(user, listInfo){
        return user.getLists({where: {name: listInfo.name}})
            .then(function(list){
                if (!_.isEmpty(list)){
                    throw new error.DuplicateListError(listInfo.name);
                }
                return models.List.create({
                    name: listInfo.name,
                    description: listInfo.description,
                }).then(function(list){
                    user.addList(list);
                    return list;
                });
            });
    };

    return {
        getLists: getLists,
        createList: createList
    };
};
