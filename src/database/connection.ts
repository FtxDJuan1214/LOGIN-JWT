import {DataSource}  from "typeorm"
import dotenv from 'dotenv'
import { User } from "../entities/Users"


dotenv.config({ path: '.env'})

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.PG_HOST || ``,
    port: parseInt(process.env.PG_PORT || ``),
    username: process.env.PG_USER || ``,
    password: process.env.PG_PASS || ``,
    database: process.env.PG_DB || ``,
    entities: [User], //Tablas que queremos que cargue en la base de datos
    logging: true,
    synchronize: true
})