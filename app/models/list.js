"use strict";

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('list', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name: {type: DataTypes.STRING},
        description: {type: DataTypes.STRING},
    }, {
        timestamps: true,
        classMethods: {
            associate: function (sequelize, models) {
                models.List.belongsTo(models.User);
            }
        },
        indexes: [
            {fields: ['id'], method: 'BTREE'},
        ]
    });
};
