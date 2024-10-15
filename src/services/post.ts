import { prismaClient } from "../lib/db";

export interface CreatePostPayload{
   title: string;
   content: string
   authorId: number
}

export interface UpdatePostPayload{
    title?: string;
    content?: string
    authorId?: number
}

class PostServices {
    public static async getAllPosts() {
        return await prismaClient.post.findMany();
    }

    public static async getPostById( id:number ) {
        return await prismaClient.post.findUnique({where: {id}});
    }

    public static async createPost(payload: CreatePostPayload) {
        return await prismaClient.post.create({data: payload});
    }

    public static async updatePost(id:number, payload:UpdatePostPayload) {
        return await prismaClient.post.update({where: {id}, data: payload});
    }

    public static async deletePost(id: number) {
        return await prismaClient.post.delete({where: {id}});
    }
}


export default PostServices;