import { Account, ID } from "appwrite";
import { AppWriteConfig } from "./AppwriteConfig";
import ProfileService from "./ProfileService"

class AuthService {
    client;
    account;

    constructor() {
        this.client = AppWriteConfig;
        this.account = new Account(this.client);
    }

    async signup({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );
            if (userAccount) {        
                await ProfileService.createProfile(userAccount)
                return this.login({ email, password });
            }
            return userAccount;
        } catch (error) {
            console.error("Appwrite service :: signup :: error", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
            
        } catch (error) {
            console.error("Appwrite service :: login :: error", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", error);
        }
        
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
export default authService;