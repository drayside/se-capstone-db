"use strict";

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        first_name: {type: DataTypes.STRING},
        last_name: {type: DataTypes.STRING},
        email: {type: DataTypes.STRING},
        username: {type: DataTypes.STRING},
        password: {type: DataTypes.STRING},
        token: {type: DataTypes.STRING},
    }, {
        timestamps: true,
        classMethods: {
            associate: function (sequelize, models) {
                models.User.hasMany(models.List);
            }
        },
        indexes: [
            {fields: ['id'], method: 'BTREE'},
        ]
    });
};
