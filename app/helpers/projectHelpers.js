"use strict";

var _ = require('lodash');
var errors = require('../common/errors');

module.exports = function (models) {

    // Returns all the projects
    var getProjects = function getProjects() {
        return models.Project.findAll();
    };

    // var getProject = function getProject(projname) {
    //     return models.Project.findAll({
    //         where: {name: name},
    //     }).then(function (user) {
    //         if (user.length === 0) throw new errors.UserNotFoundError(name);
    //         else return user[0];
    //     });
    // };

    // Gets by the filter param. For instance filter = { username : 'a' } will return the user
    // with username = 'a'
    // var getUserByFilter = function getUserByFilter(filter) {
    //     return models.User.find({
    //         where: filter,
    //     }).then(function (user) {
    //         if (user === null) {
    //             throw new errors.UserNotFoundError(filter);
    //         } else {
    //             return user;
    //         }
    //     });
    // };

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

    // var createUser = function createUser(userInfo) {
    //     return getUserByFilter({username: userInfo.username})
    //         .then(function () {
    //             throw new errors.UserExistsError(userInfo.username);
    //         }).catch(errors.UserNotFoundError, function () {
    //             userInfo.token = authenticationHelpers.encodePayload(userInfo);
    //             userInfo.password = authenticationHelpers.generateHashedPassword(userInfo.password);
    //             return models.User.create({
    //                 first_name: userInfo.first_name,
    //                 last_name: userInfo.last_name,
    //                 email: userInfo.email,
    //                 username: userInfo.username,
    //                 password: userInfo.password,
    //                 token: userInfo.token,
    //             });
    //         });
    // };
    //
    // var deleteUser = function deleteUser(userId) {
    //     return models.User.find({where: {id: userId}})
    //         .then(function (user) {
    //             if (!_.isNull(user)) {
    //                 return user.destroy();
    //             }
    //         });
    // };

    return {
        getProjects: getProjects,
        // getProject: getProject,
        // getUserByFilter: getUserByFilter,
        getProjectById: getProjectById,
        // createUser: createUser,
        // deleteUser: deleteUser
    };
};
