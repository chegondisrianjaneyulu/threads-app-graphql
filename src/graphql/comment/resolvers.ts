import CommentService, { CreateCommentPayload } from "../../services/comment"

const queries = {
    getComments: async () => {
        return CommentService.getAllComments()
    }
}

const mutations = {
    createComment: async (_:any, payload: CreateCommentPayload) => {
        let res = await CommentService.createComment(payload);
        return res.id;
    }
}

export const resolvers = {queries, mutations}