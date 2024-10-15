import { prismaClient } from "../lib/db";

export interface CreateUserPayload{
    name: string;
    email: string;

}

class UserService {
    public static async createUser(payload: CreateUserPayload) {
        return await prismaClient.user.create({data: payload})
    }

    public static getUsers() {
        return prismaClient.user.findMany()
    }


}

export default UserService;