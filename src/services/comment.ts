import { prismaClient } from "../lib/db";

export  interface CreateCommentPayload {
    content: string;
    postId: number;
    userId: number;
}

export interface UpdateCommentPayload {
    content?: string;
    postId?: number;
    userId?: number;
}
 
class CommentService {
   
    public static async getAllComments() {
        return await prismaClient.comment.findMany();
    }

    public static async getCommentsById(id: number) {
        return await prismaClient.comment.findUnique({where: {id}});
    }

    public static async createComment(payload: CreateCommentPayload) {
        return await prismaClient.comment.create({data: payload})
    }

    public static async updateComment(id:number, payload:UpdateCommentPayload) {
        return await prismaClient.comment.update({where: {id}, data: payload})
    }
 
    public static async deleteComment(id:number) {
        return await prismaClient.comment.delete({where: {id}});
    }

}


export default CommentService;