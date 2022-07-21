"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const main_routes_1 = __importDefault(require("./routes/main.routes"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)());
//Establecer el motor de platinllas
app.set('view engine', 'ejs');
//app.set('views', __dirname + '/views');
//Establecer la carpeta pubic para los archivos estáticos
app.use(express_1.default.static('./public'));
//Para procesar datos enviados desde forms
app.use(express_1.default.urlencoded({ extended: true }));
//app.use(express.json)
//Establecer las variables de entorno
dotenv_1.default.config({ path: './env/.env' });
//Para poder trabajar con cookies
//app.use(cookieParser())
app.use(main_routes_1.default);
exports.default = app;
