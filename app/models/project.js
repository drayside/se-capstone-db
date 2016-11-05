"use strict";

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('project', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name: {type: DataTypes.STRING},
        students: {type: DataTypes.STRING},
        external_partners: {type: DataTypes.STRING},
        abstract: {type: DataTypes.STRING},
        status: {type: DataTypes.STRING},
        tags: {type: DataTypes.STRING},
        year: {type: DataTypes.INTEGER},
        program: {type: DataTypes.STRING}
    }, {
        timestamps: true,
        indexes: [
            {fields: ['id'], method: 'BTREE'},
        ]
    });
};
