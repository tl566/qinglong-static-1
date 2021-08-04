"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const util_1 = require("./util");
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv_1.default.config();
const rootPath = path_1.default.resolve(__dirname, '../../');
const envFile = path_1.default.join(rootPath, 'config/env.sh');
const confFile = path_1.default.join(rootPath, 'config/config.sh');
const sampleFile = path_1.default.join(rootPath, 'sample/config.sample.sh');
const crontabFile = path_1.default.join(rootPath, 'config/crontab.list');
const confBakDir = path_1.default.join(rootPath, 'config/bak/');
const authConfigFile = path_1.default.join(rootPath, 'config/auth.json');
const extraFile = path_1.default.join(rootPath, 'config/extra.sh');
const configPath = path_1.default.join(rootPath, 'config/');
const scriptPath = path_1.default.join(rootPath, 'scripts/');
const samplePath = path_1.default.join(rootPath, 'sample/');
const logPath = path_1.default.join(rootPath, 'log/');
const authError = '错误的用户名密码，请重试';
const loginFaild = '请先登录!';
const configString = 'config sample crontab shareCode diy';
const dbPath = path_1.default.join(rootPath, 'db/');
const cronDbFile = path_1.default.join(rootPath, 'db/crontab.db');
const envDbFile = path_1.default.join(rootPath, 'db/env.db');
const configFound = dotenv_1.default.config({ path: confFile });
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
if (configFound.error) {
    throw new Error("⚠️  Couldn't find config.sh file  ⚠️");
}
exports.default = {
    port: parseInt(process.env.PORT, 10),
    cronPort: parseInt(process.env.CRON_PORT, 10),
    secret: process.env.SECRET || util_1.createRandomString(16, 32),
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    api: {
        prefix: '/api',
    },
    configString,
    loginFaild,
    authError,
    logPath,
    extraFile,
    authConfigFile,
    confBakDir,
    crontabFile,
    sampleFile,
    confFile,
    envFile,
    dbPath,
    cronDbFile,
    envDbFile,
    configPath,
    scriptPath,
    samplePath,
    blackFileList: [
        'auth.json',
        'config.sh.sample',
        'cookie.sh',
        'crontab.list',
        'env.sh',
    ],
    writePathList: [
        '/ql/scripts/',
        '/ql/config/',
        '/ql/jbot/',
        '/ql/bak/',
    ],
};
//# sourceMappingURL=index.js.map