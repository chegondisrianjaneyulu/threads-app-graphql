export const typeDefs = `
   type Comment {
    id: ID!, 
    title: String,
    content: String
    post: Post
    user: User
   }
`