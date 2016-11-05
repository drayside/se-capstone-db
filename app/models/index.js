"use strict";

module.exports = function (sequelize) {
    var models = {
        Project: sequelize.import(__dirname + "/project")
    };

    Object.keys(models).forEach(function (modelName) {
        if (models[modelName].hasOwnProperty('associate')) {
            models[modelName].associate(sequelize, models);
        }
    });

    return models;
};
