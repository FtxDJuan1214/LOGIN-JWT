import { NextFunction, Request, Response } from "express";
import { promisify } from "util";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { User } from "../entities/Users"

dotenv.config({ path: '.env'})

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {

    if(req.cookies.ftxd_token)
    {
        try {

            
            const jwtPayload: string = jwt.verify(req.cookies.ftxd_token as string,process.env.JWT_SECRET || "") as string
            const jsonString: string = JSON.stringify(jwtPayload)
            const decoded = JSON.parse(jsonString)

            const userOK = await User.findOneBy({id: decoded.id})
         
            if(!userOK){return next()}

            req.body.user = userOK
            return next()
            
        } catch (error) {
            if(error instanceof Error)
            {
                return res.status(500).json({message: error.message})
            }
        }
    }
    else{
        res.redirect('/login')
    }
}