"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const proc = __importStar(require("process"));
const midwares_mjs_1 = require("./middleware/midwares.mjs");
const api_mjs_1 = __importDefault(require("./routes/api.mjs"));
const google_credit_handler_mjs_1 = __importDefault(require("./routes/google_credit_handler.mjs"));
// Global Variables
const PATH_ROOT = path.dirname(proc.cwd());
const PATH_CLIENT = path.join(PATH_ROOT, '/client');
const PATH_CREDIT = path.join(PATH_CLIENT, 'client_secrets.json');
dotenv_1.default.config({});
const port = 8080;
const server = (0, express_1.default)();
server.use('/api', api_mjs_1.default);
server.use('/google', google_credit_handler_mjs_1.default);
server.use('/public', express_1.default.static('public'));
server.use('/app', express_1.default.static('app'));
server.listen(port, 'localhost', () => {
    console.log(`Listening on Port ${port}\nWebsite: http://localhost:${port}/`);
});
server.use(midwares_mjs_1.error_handler);
//# sourceMappingURL=index.cjs.map