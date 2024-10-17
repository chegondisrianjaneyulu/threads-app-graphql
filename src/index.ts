import express, {Request, Response} from 'express'
import createApolloGraphqlServer from './graphql'
import { expressMiddleware } from '@apollo/server/express4';

async function init() {
    const app = express();
    const PORT = process.env.PORT || 8000
    app.use(express.json())
    
    let gqlServer = await createApolloGraphqlServer()

    app.use('/graphql', expressMiddleware(gqlServer))

    app.use('/', (req:Request, res:Response) => {
        res.send('hello')
    })

    app.listen(PORT, () => {console.log('Server is started at port ', PORT)}) 
}

init();