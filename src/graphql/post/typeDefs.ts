export const typeDefs = `
   type Post {
    id: ID!, 
    title: String,
    content: String
    user: User
    comment: [Comment]
   }
`