import PostServices, { CreatePostPayload } from "../../services/post"


const queries = {
    getPosts:  async () => {
        return await PostServices.getAllPosts();
    }
}

const mutations = {
    createPost: async (_:any, payload:CreatePostPayload) => {
        let res = await PostServices.createPost(payload);
        return res.id;
    }
}

export const resolvers = {queries, mutations}