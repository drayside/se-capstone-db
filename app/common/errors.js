"use strict";

var util = require("util");
var _ = require("lodash");

function UserExists(username) {
    this.message = "Username exists: " + username;
}
util.inherits(UserExists, Error);

function UserNotFound(username) {
    this.message = "Username does not exist: " + username;
}
util.inherits(UserNotFound, Error);

function ItemNotFound(itemId) {
    this.message = "Item not found with id: " + itemId;
}
util.inherits(ItemNotFound, Error);

function DuplicateList(listname) {
    this.message = "List name exists: " + listname;
}
util.inherits(DuplicateList, Error);

function DuplicateItem(itemName) {
    this.message = "Item name exists: " + itemName;
}
util.inherits(DuplicateItem, Error);

function ListNotFound(listId) {
    this.message = "List id not found: " + listId;
}
util.inherits(ListNotFound, Error);

function Validation(errs) {
    this.message = _.pluck(errs, "message").join("; ");
}
util.inherits(Validation, Error);

function MissingArgument(argName) {
    this.message = "Missing argument: " + argName;
}
util.inherits(MissingArgument, Error);

module.exports = {
    UserExistsError: UserExists,
    UserNotFoundError: UserNotFound,
    ItemNotFoundError: ItemNotFound,
    DuplicateListError: DuplicateList,
    DuplicateItemError: DuplicateItem,
    ListNotFoundError: ListNotFound,
    ValidationError: Validation,
    MissingArgumentError: MissingArgument,
};
