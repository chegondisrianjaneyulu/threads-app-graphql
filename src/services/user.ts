import { prismaClient } from "../lib/db";
import { createHmac, randomBytes } from "node:crypto";
import JWT from "jsonwebtoken";

const JWT_SECRET = "sri@skimbox.us";

export interface CreateUserPayload{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImageUrl: string
}

export interface GetUserTokenPayload {
    email: string;
    password: string
}

class UserService {
    
    private static generateHash( salt: string, password:string ) {
        const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");
        return hashedPassword;
    }

    private static getUserByEmail(email: string) {
      return prismaClient.user.findUnique({where: {email}})
    }

    public static async createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password, profileImageUrl } = payload;
        const salt = randomBytes(32).toString("hex");
        const hashedPassword = UserService.generateHash(salt, password);

        return await prismaClient.user.create({data: {
            firstName,
            lastName,
            email,
            salt,
            password: hashedPassword,
            profileImageUrl
        }})


    }

    public static async getUserToken(payload: GetUserTokenPayload) {
        const {email, password} = payload;

        const user = await UserService.getUserByEmail(email);
        if (!user) throw new Error("user not found");

        let userSalt = user.salt
        const hashedPassword = UserService.generateHash(userSalt, password);
        if ( hashedPassword !== user.password ) throw new Error("Incorrect Password");


        const token = JWT.sign({ id: user.id, email: user.email }, JWT_SECRET);
        return token;


    }

    public static decodeJWTToken(token: string) {
        return JWT.verify(token, JWT_SECRET);
    }

    public static getUsers() {
        return prismaClient.user.findMany()
    }


}

export default UserService;