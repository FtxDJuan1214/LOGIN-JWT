import express from 'express'
import morgan from 'morgan'
import cors from 'cors'


import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

import UserRoutes from './routes/main.routes'

const app = express()

app.use(morgan('dev'))
app.use(cors())


//Establecer el motor de platinllas
app.set('views', __dirname + '/views'); //Ruta absoluta para que no falle
app.set('view engine', 'ejs');

//Establecer la carpeta pubic para los archivos estáticos
app.use(express.static('./public'))


//Para procesar datos enviados desde forms
app.use(express.urlencoded({extended: true}))
app.use(express.json())

//Establecer las variables de entorno
dotenv.config({path: './env/.env'})

//Para poder trabajar con cookies
app.use(cookieParser())

app.use(UserRoutes)

export default app