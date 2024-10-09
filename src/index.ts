import express, {Request, Response} from 'express'
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

async function init() {
    const app = express();
    const PORT = process.env.PORT || 8000


    app.use(express.json())
 
    //ggl server 
    const gqlServer = new ApolloServer({
        typeDefs: `
          type Query {
            hello: String
          }
        `,
        resolvers: {
            Query: {
                hello: () => `Hey hello These  is graphql`
            }
        }
    })

    await gqlServer.start();

    app.use('/graphql', expressMiddleware(gqlServer))

    app.use('/', (req:Request, res:Response) => {
        res.send('hello')
    })

    app.listen(PORT, () => {console.log('Server is started at port ', PORT)}) 
}

init();