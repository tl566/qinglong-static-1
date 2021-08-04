"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
const util_1 = require("../config/util");
const express_1 = require("express");
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../config"));
const fs = __importStar(require("fs"));
const celebrate_1 = require("celebrate");
const route = express_1.Router();
exports.default = (app) => {
    app.use('/', route);
    route.get('/scripts/files', async (req, res, next) => {
        const logger = typedi_1.Container.get('logger');
        try {
            const fileList = fs.readdirSync(config_1.default.scriptPath, 'utf-8');
            res.send({
                code: 200,
                data: fileList
                    .filter((x) => {
                    return !fs.lstatSync(config_1.default.scriptPath + x).isDirectory();
                })
                    .map((x) => {
                    return { title: x, value: x, key: x };
                }),
            });
        }
        catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });
    route.get('/scripts/:file', async (req, res, next) => {
        const logger = typedi_1.Container.get('logger');
        try {
            const content = util_1.getFileContentByName(`${config_1.default.scriptPath}${req.params.file}`);
            res.send({ code: 200, data: content });
        }
        catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });
    route.post('/scripts', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            filename: celebrate_1.Joi.string().required(),
            path: celebrate_1.Joi.string().required(),
            content: celebrate_1.Joi.string().required(),
        }),
    }), async (req, res, next) => {
        const logger = typedi_1.Container.get('logger');
        try {
            let { filename, path, content } = req.body;
            if (!path.endsWith('/')) {
                path += '/';
            }
            if (config_1.default.writePathList.every((x) => !path.startsWith(x))) {
                return res.send({ code: 400, data: '文件路径错误，可保存目录/ql/scripts、/ql/config、/ql/jbot、/ql/bak' });
            }
            const filePath = `${path}${filename.replace(/\//g, '')}`;
            const bakPath = '/ql/bak';
            if (fs.existsSync(filePath)) {
                if (!fs.existsSync(bakPath)) {
                    fs.mkdirSync(bakPath);
                }
                fs.copyFileSync(filePath, bakPath);
            }
            fs.writeFileSync(filePath, content);
            return res.send({ code: 200 });
        }
        catch (e) {
            logger.error('🔥 error: %o', e);
            return next(e);
        }
    });
};
//# sourceMappingURL=script.js.map