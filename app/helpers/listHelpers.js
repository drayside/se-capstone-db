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

    return {
        getLists: getLists,
    };
};
