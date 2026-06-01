"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const db_config_1 = __importDefault(require("./config/db.config"));
const env_config_1 = __importDefault(require("./config/env.config"));
const PORT = env_config_1.default.port;
const DB_URI = env_config_1.default.db_uri;
//! connect database
(0, db_config_1.default)(DB_URI);
//! listening on port
app_1.default.listen(PORT, () => {
    console.log(`server is running at http://localhost:${PORT}`);
    console.log("Press CTRL + C to close the server");
});
