"use strict";

var _ = require('lodash');
var errors = require('../common/errors');
var Promise = require('bluebird');

module.exports = function (models, authenticationHelpers) {

    // Creates a single item with the item info
    var createItem = function createItem(itemInfo){
        return models.Item.create({
            name: itemInfo.name,
            quantity: itemInfo.quantity,
            price: itemInfo.price,
        });
    };

    var getItemById = function getItemById(list, itemId){
        return list.getItems(
            {
                where: {
                    id: itemId
                }
            }
        );
    }

    return {
        createItem: createItem,
        getItemById: getItemById
    };
};
