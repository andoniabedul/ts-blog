"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
////////////////// DEPENDENCIES //////////////////
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
////////////////// ROUTES //////////////////
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.PORT = 9000;
        this.VERSION = 'v1';
        this.setConfig();
    }
    setConfig() {
        this.app.set('port', this.PORT);
        this.setDB();
        this.setMiddlewares();
        this.setRoutes(this.VERSION);
    }
    setDB() {
        const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/restapi';
        const MONGO_OPTIONS = {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        };
        mongoose_1.default.connect(MONGO_URI, MONGO_OPTIONS).then(db => console.log(`DB ON ${MONGO_URI} IS CONNECTED`));
    }
    setMiddlewares() {
        this.app.use('logger', morgan_1.default(process.env.ENVIRONMENT || 'DEV'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use(compression_1.default());
        this.app.use(cors_1.default());
        this.app.use(helmet_1.default());
    }
    getApiResource(prefix, version, resource) {
        return `/${prefix}/${version}/${resource}`;
    }
    setRoutes(API_VERSION) {
        this.app.use(index_routes_1.default);
        this.app.use(this.getApiResource('api', this.VERSION, 'posts'), post_routes_1.default);
    }
    start() {
        this.app.listen(this.PORT, () => console.log(`Server on port ${this.PORT}`));
    }
}
const server = new Server();
server.start();
