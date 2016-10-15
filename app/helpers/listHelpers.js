"use strict";

var _ = require('lodash');
var errors = require('../common/errors');
var Promise = require('bluebird');

module.exports = function (models, authenticationHelpers) {

    // Returns lists for the given user
    var getLists = function getLists(user) {
        return new Promise(function(resolve){
            resolve(user.lists);
        });
    };

    return {
        getLists: getLists,
    };
};
