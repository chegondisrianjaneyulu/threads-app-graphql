import { ApolloServer } from '@apollo/server';
import { User } from './user';
import UserService from '../services/user';
import  {Request} from 'express'

interface Context {
    user?: any; 
}
async function createApolloGraphqlServer() {
    const gqlServer = new ApolloServer<Context>({
        typeDefs: `
          ${User.typeDefs},
          type Query {
              ${User.queries}
          }
          type Mutation {
              ${User.mutations}
          }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations
            }
        }

    })

    await gqlServer.start();
    return gqlServer
}

export default createApolloGraphqlServer