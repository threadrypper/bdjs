"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataType = void 0;
/**
 * Enumeration of possible data types for instruction outputs.
 */
var DataType;
(function (DataType) {
    DataType[DataType["Any"] = 0] = "Any";
    DataType[DataType["Boolean"] = 1] = "Boolean";
    DataType[DataType["Number"] = 2] = "Number";
    DataType[DataType["String"] = 3] = "String";
})(DataType || (exports.DataType = DataType = {}));
