"use strict";

var _ = require('lodash');
var errors = require('../common/errors');

module.exports = function (models) {

    // Returns all the projects
    var getProjects = function getProjects() {
        return models;
    };

    var getProject = function getProject(name) {
        return models[name];
    };

    var getProjectById = function getProjectById(id) {
        console.log("project: ", models.Project);
        return models.Project.find({where: {id: id}}).then(function (project) {
            if (project === null) {
                throw new errors.ProjectNotFoundError(id);
            } else {
                return project;
            }
        });
    };

    return {
        getProjects: getProjects,
        getProject: getProject,
        getProjectById: getProjectById,
    };
};
