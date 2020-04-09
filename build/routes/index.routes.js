"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Index {
    constructor() {
        this.router = express_1.Router();
        this.setRoutes();
    }
    setRoutes() {
        this.router.get('/', (req, res) => res.send('Hello'));
    }
}
const IndexRouter = new Index();
exports.default = IndexRouter.router;
