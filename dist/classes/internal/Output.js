"use strict";
var _Output_value, _Output_error;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Output = void 0;
const tslib_1 = require("tslib");
class Output {
    constructor(value, error = false) {
        _Output_value.set(this, '');
        _Output_error.set(this, false);
        tslib_1.__classPrivateFieldSet(this, _Output_value, value, "f");
        tslib_1.__classPrivateFieldSet(this, _Output_error, error, "f");
    }
    /**
     * Creates an OK output.
     * @param value The value to wrap.
     * @returns {string}
     */
    static ok(value) {
        return new Output(String(value) ?? '');
    }
    /**
     * Creates an error output.
     * @param value The value to wrap.
     * @returns {string}
     */
    static error(value) {
        return new Output(String(value) ?? '', true);
    }
    isError() {
        return tslib_1.__classPrivateFieldGet(this, _Output_error, "f");
    }
    get value() {
        return tslib_1.__classPrivateFieldGet(this, _Output_value, "f");
    }
}
exports.Output = Output;
_Output_value = new WeakMap(), _Output_error = new WeakMap();
