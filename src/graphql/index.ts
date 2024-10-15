import { ApolloServer } from '@apollo/server';
import { User } from './user';
import {Post} from './post';
import { Comment } from './comment';

interface Context {
    user?: any; 
}
async function createApolloGraphqlServer() {
    const gqlServer = new ApolloServer<Context>({
        typeDefs: `
               ${User.typeDefs},
               ${Post.typeDefs},
               ${Comment.typeDefs},
               
          type Query {
               ${User.queries},
               ${Post.queries},
               ${Comment.queries},

          }
          type Mutation {
              ${User.mutations},
              ${Post.mutations},
              ${Comment.mutations}
          }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
                ...Post.resolvers.queries,
                ...Comment.resolvers.queries

            },
            Mutation: {
                ...User.resolvers.mutations,
                ...Post.resolvers.mutations,
                ...Comment.resolvers.mutations
            }
        }

    })

    await gqlServer.start();
    return gqlServer
}

export default createApolloGraphqlServer