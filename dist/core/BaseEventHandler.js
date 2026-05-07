"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEventHandler = void 0;
class BaseEventHandler {
    constructor(data) {
        this.data = data;
    }
    get listener() {
        return this.data.run;
    }
    get description() {
        return this.data.description;
    }
    get name() {
        return this.data.name;
    }
    add(client) {
    }
}
exports.BaseEventHandler = BaseEventHandler;
