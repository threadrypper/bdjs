"use strict";
var _Output_value, _Output_type, _Output_message;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = exports.OutputType = void 0;
const tslib_1 = require("tslib");
var OutputType;
(function (OutputType) {
    OutputType["OK"] = "ok";
    OutputType["ERROR"] = "error";
    OutputType["WARNING"] = "warning";
    OutputType["EMPTY"] = "empty";
    OutputType["STOP"] = "stop";
})(OutputType || (exports.OutputType = OutputType = {}));
class Output {
    constructor(type, value, message) {
        _Output_value.set(this, void 0);
        _Output_type.set(this, void 0);
        _Output_message.set(this, void 0);
        tslib_1.__classPrivateFieldSet(this, _Output_type, type, "f");
        tslib_1.__classPrivateFieldSet(this, _Output_value, value, "f");
        tslib_1.__classPrivateFieldSet(this, _Output_message, message, "f");
    }
    static ok(value) {
        return new Output(OutputType.OK, value);
    }
    static error(message) {
        return new Output(OutputType.ERROR, undefined, message);
    }
    static warning(value, message) {
        return new Output(OutputType.WARNING, value, message);
    }
    static empty() {
        return new Output(OutputType.EMPTY);
    }
    static stop() {
        return new Output(OutputType.STOP);
    }
    get value() {
        if (this.isError()) {
            throw new Error('Tried to access value of an error output');
        }
        return tslib_1.__classPrivateFieldGet(this, _Output_value, "f");
    }
    get type() {
        return tslib_1.__classPrivateFieldGet(this, _Output_type, "f");
    }
    get message() {
        return tslib_1.__classPrivateFieldGet(this, _Output_message, "f");
    }
    isOk() {
        return tslib_1.__classPrivateFieldGet(this, _Output_type, "f") === OutputType.OK;
    }
    isError() {
        return tslib_1.__classPrivateFieldGet(this, _Output_type, "f") === OutputType.ERROR;
    }
    isWarning() {
        return tslib_1.__classPrivateFieldGet(this, _Output_type, "f") === OutputType.WARNING;
    }
}
exports.Output = Output;
_Output_value = new WeakMap(), _Output_type = new WeakMap(), _Output_message = new WeakMap();
