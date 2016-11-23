"use strict";

var _ = require('lodash');
var shortid = require('shortid');
var fs = require('fs');
var errors = require('../common/errors');
var graphGenerator = require('../graph/graphGenerator');

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

    var getGraph = function getGraph(callback, min, max) {
        var generator = graphGenerator(models);
        var filename = __dirname + "/../../temp/" + shortid.generate() + ".svg";
        generator.generateGraph(callback, min, max);
    }

    return {
        getProjects: getProjects,
        getProject: getProject,
        getProjectById: getProjectById,
        getGraph: getGraph
    };
};
