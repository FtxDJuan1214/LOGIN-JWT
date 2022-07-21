"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./entities/Users");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123",
    database: "loginjwt",
    synchronize: true,
    logging: true,
    entities: [Users_1.User], //Tablas que queremos que cargue en la base de datos
});
