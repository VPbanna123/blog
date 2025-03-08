import conf from "../conf/conf.js";
import { Client, Account } from "appwrite"
import { ID } from "appwrite";
export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)

    }

    async createAccount({ email, password, name }) {
        try {
            console.log("Creating user:", { email, password, name });
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            console.log("User created:", userAccount);
            if (userAccount) {
                // await this.account.createVerification();
                // return { success: true, message: "Account created! Please verify your email." };
        
                return this.login({email,password});
                // const session = await this.login({ email, password });
                // console.log("User logged in:", session);
                // return session;
            } else {
                return null;
            }

        } catch (error) {
            console.error("Appwrite error :: createAccount", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const session= await this.account.createEmailSession(email, password)
            // const user=await this.account.get();
            // if(!user.emailVerification)
            // {
            //     throw new Error("please verify your email before logging in")
            
            // }
            return session;
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("appwrite error ::getcurrentuser", error)
            return null;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
    // async resendVerification(){
    //     try {
    //         await this.account.createVerification();
    //         console.log("verification email is resent")
    //         return { success: true, message: "Verification email resent. Check your inbox." };
 
    //     } catch (error) {
    //         console.error("Error resending verification email:", error);
    //         throw error;
    //     }
    // }

}

const authService = new AuthService();
export default authService