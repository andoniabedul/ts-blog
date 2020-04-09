"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
////////////////// DEPENDENCIES //////////////////
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
////////////////// ROUTES //////////////////
const index_routes_1 = __importDefault(require("./routes/index.routes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.setConfig();
    }
    setConfig() {
        this.app.set('port', process.env.PORT || 9000);
        this.setMiddlewares();
    }
    setMiddlewares() {
        this.app.use('logger', morgan_1.default(process.env.ENVIRONMENT || 'DEV'));
        this.app.use(helmet_1.default());
    }
    setRoutes() {
        this.app.use(index_routes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port %s', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
