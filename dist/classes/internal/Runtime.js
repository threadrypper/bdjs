"use strict";
var _Runtime_code, _Runtime_compiled, _Runtime_mustStop, _Runtime___internal__;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Runtime = void 0;
const tslib_1 = require("tslib");
const InstructionManager_1 = require("../../managers/InstructionManager");
class Runtime {
    constructor() {
        /**
         * The self argument for the instruction.
         */
        this.self = {
            unwrapped: [],
            raw: {},
            data: {}
        };
        /**
         * The instruction manager.
         */
        this.instructions = new InstructionManager_1.InstructionManager();
        /**
         * The interpreted code.
         */
        _Runtime_code.set(this, void 0);
        /**
         * The compiled data.
         */
        _Runtime_compiled.set(this, void 0);
        /**
         * Whether the runtime must stop its execution.
         */
        _Runtime_mustStop.set(this, false
        /**
         * Environment variables.
         * NOT ACCESIBLE USING `$get`.
         */
        );
        /**
         * Environment variables.
         * NOT ACCESIBLE USING `$get`.
         */
        _Runtime___internal__.set(this, new Map()
        /**
         * Gets the compiled arguments of the instruction.
         * @returns {Array<string>} The compiled arguments.
         */
        );
    }
    /**
     * Gets the compiled arguments of the instruction.
     * @returns {Array<string>} The compiled arguments.
     */
    getCompiledArgs() {
        return this.self.unwrapped.length === 0 ? this.self.raw.fields.map((field) => field.value) : this.self.unwrapped;
    }
    /**
     * Set the result string of the interpretation phase.
     * @param result The result string.
     */
    setResultString(result) {
        tslib_1.__classPrivateFieldSet(this, _Runtime_code, result, "f");
    }
    /**
     * Gets the result string.
     * @returns {string}
     */
    getResultString() {
        return tslib_1.__classPrivateFieldGet(this, _Runtime_code, "f");
    }
    /**
     * Set the compiled data of the interpretation phase.
     * @param compiledData The compiled data.
     */
    setCompiledData(compiledData) {
        tslib_1.__classPrivateFieldSet(this, _Runtime_compiled, compiledData, "f");
    }
    /**
     * Gets the compiled data.
     * @returns {CompiledData}
     */
    getCompiledData() {
        return tslib_1.__classPrivateFieldGet(this, _Runtime_compiled, "f");
    }
    /**
     * Sets an environment variable.
     * NOT ACCESIBLE USING `$let`.
     * @param {string} name The name of the environment variable.
     * @param {unknown} value The value of the environment variable.
     */
    setEnvironmentVariable(name, value) {
        tslib_1.__classPrivateFieldGet(this, _Runtime___internal__, "f").set(name, value);
    }
    /**
     * Gets an environment variable.
     * NOT ACCESIBLE USING `$get`.
     * @param {string} name The name of the environment variable.
     * @returns {unknown}
     */
    getEnvironmentVariable(name) {
        return tslib_1.__classPrivateFieldGet(this, _Runtime___internal__, "f").get(name);
    }
    /**
     * Makes the runtime stop its execution.
     * @param state Whether the runtime must stop.
     */
    makeStop(state = true) {
        tslib_1.__classPrivateFieldSet(this, _Runtime_mustStop, state, "f");
    }
    /**
     * Gets whether the runtime must stop its execution.
     * @returns {boolean}
     */
    get mustStop() {
        return tslib_1.__classPrivateFieldGet(this, _Runtime_mustStop, "f");
    }
}
exports.Runtime = Runtime;
_Runtime_code = new WeakMap(), _Runtime_compiled = new WeakMap(), _Runtime_mustStop = new WeakMap(), _Runtime___internal__ = new WeakMap();
