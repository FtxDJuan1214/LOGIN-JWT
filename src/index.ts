import "reflect-metadata"
import app from './app'
import {AppDataSource} from './database/connection'

async function main(){

    try {
        await AppDataSource.initialize()
        console.log('Database connected')

        
        app.listen(5000)
        console.log('Server is running on port ', 5000)

    } catch (error) {
        console.log(error)
    }
}

main()

