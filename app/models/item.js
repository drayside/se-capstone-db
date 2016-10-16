"use strict";

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('item', {
        id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
        name: {type: DataTypes.STRING},
        quantity: {type: DataTypes.INTEGER},
        price: {type: DataTypes.INTEGER},
    }, {
        timestamps: true,
        classMethods: {
            associate: function (sequelize, models) {
                models.Item.belongsTo(models.List);
            }
        },
        indexes: [
            {fields: ['id'], method: 'BTREE'},
        ]
    });
};
