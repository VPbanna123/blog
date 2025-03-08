import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite"

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
                return this.login({email,password});
                // const session = await this.login({ email, password });
                // console.log("User logged in:", session);
                // return session;
            } else {
                return userAccount;
            }

        } catch (error) {
            console.error("Appwrite error :: createAccount", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password)
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

}

const authService = new AuthService();
export default authService