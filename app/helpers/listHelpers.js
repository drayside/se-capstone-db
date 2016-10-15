"use strict";

var _ = require('lodash');
var errors = require('../common/errors');

module.exports = function (models, authenticationHelpers) {

    // Returns all the users
    var getLists = function getLists() {
        return models.List.findAll();
    };

    return {
        getLists: getLists,
    };
};
