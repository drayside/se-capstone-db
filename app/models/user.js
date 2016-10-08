"use strict";

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name: {type: DataTypes.STRING},
        email: {type: DataTypes.STRING},
        password: {type: DataTypes.STRING},
    }, {
        timestamps: true,
        indexes: [
            {fields: ['id'], method: 'BTREE'},
        ]
    });
};
