import { Request, Response} from "express"
import { AppDataSource } from "../database/connection"
import jwt from "jsonwebtoken"
import { promisify } from "util"
import bcryptjs from "bcryptjs"
import { User } from "../entities/Users"
import dotenv from  "dotenv"

dotenv.config({ path: '.env'})

export const index = (req:Request, res:Response)=>{
    try {
        console.log( 'usuario', {user: req.body.user.User} )
        
        return res.render('index', {user: req.body.user})
        
    } catch (error) {
        if(error instanceof Error)
        {
            return res.status(500).json({message: error.message})
        }
    }
}

export const login = (req:Request, res:Response)=>{
    try {
        return res.render('login', {alert: false})
        
    } catch (error) {
        if(error instanceof Error)
        {
            return res.status(500).json({message: error.message})
        }
    }
}

export const register = (req:Request, res:Response)=>{
    try {
        return res.render('register')
        
    } catch (error) {
        if(error instanceof Error)
        {
            return res.status(500).json({message: error.message})
        }
    }
}


export const registerUser =  async (req: Request, res: Response) => {

    try {
        //Get form data
        const {name, user, password} = req.body

        //Validate if the nickname  already exist
        const exist = await User.findOneBy({user: user})
        
        if(exist) return res.status(200).json({message: 'User already exist'})

        //Encrypt password
        let passHash = await bcryptjs.hash(password, 10)

        //Save on database

        const newUser = new User()
        newUser.name = name
        newUser.user = user
        newUser.password = passHash

        await newUser.save()
        
        res.redirect('/')

    } catch (error) {
        if(error instanceof Error)
        {
            return res.status(500).json({message: error.message})
        }
    }
}

export const loginUser = async (req: Request, res: Response) =>{
    try {
        
        const {user, password} = req.body

        if(!user || !password)
        {
            res.render('login', {
                alert: true,
                alertTitle: "Advertencia", 
                alertMessage: "Ingrese un usuario y contraseña",
                showConfirmButton: true,
                alertIcon: 'Info', 
                showConfirmationButton: true,
                timer: false,
                route: 'login'
            })
        }
        else
        {
            const bdUser = await User.findOneBy({user: user})
            if(!bdUser || !await bcryptjs.compare(password,bdUser.password ))
            {
                res.render('login', {
                    alert: true,
                    alertTitle: "Advertencia", 
                    alertMessage: "Credeniales incorrectas",
                    showConfirmButton: true,
                    alertIcon: 'error', 
                    showConfirmationButton: true,
                    timer: 800,
                    route: 'login'
                })
            }
            else
            {
                //Inicio de sesion OK
                const {id} = bdUser
                console.log('id',id);
                
              
                //const token = jwt.sign({id: id}, process.env.JWT_SECRET || ``) Sin fecha de expiración
                const token = jwt.sign({id: id}, process.env.JWT_SECRET || ``, {
                    expiresIn : process.env.JWT_EXPIRE_TIME || ``
                })

                console.log('token', token);
                
                //Configurar los cookies
                const cookieOptions = {
                    expires: new Date (Date.now() + Number(process.env.JWT_COOKIE_EXPIRES || ``) * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }

                res.cookie('ftxd_token', token, cookieOptions)

                res.render('login', {
                    alert: true,
                    alertTitle: "Conexión exitosa", 
                    alertMessage: "¡Login Correcto!",
                    showConfirmButton: true,
                    alertIcon: 'success', 
                    showConfirmationButton: true,
                    timer: 2000,
                    route: ''
                })
            }
        }
        
    } catch (error) {
        if(error instanceof Error)
        {
            return res.status(500).json({message: error.message})
        }
    }
}

export const logout = (req: Request, res: Response)=>{
    res.clearCookie('ftxd_token')
    res.redirect('/')
}

