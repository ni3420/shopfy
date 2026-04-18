import { Databases, Query ,ID} from "appwrite";
import { AppWriteConfig } from "./AppwriteConfig";
import { confi } from "../confi/confi";

class ProfileService {
    client;
    databases;
    dbId = confi.Database_id;

    constructor() {
        this.client = AppWriteConfig;
        this.databases = new Databases(this.client);
    }

    async updateProfile(userId, data) {
        try {
            return await this.databases.updateDocument(this.dbId, "users_profile", userId, data);
        } catch (error) {
            console.log("Appwrite Service :: updateProfile :: error", error);
        }
    }

    async addAddress(data) {
        try {
            return await this.databases.createDocument(this.dbId, "addresses", ID.unique(), data);
        } catch (error) {
            console.log("Appwrite Service :: addAddress :: error", error);
        }
    }

    async getAddresses(userId) {
        try {
            return await this.databases.listDocuments(this.dbId, "addresses", [
                Query.equal("userId", userId)
            ]);
        } catch (error) {
            console.log("Appwrite Service :: getAddresses :: error", error);
        }
    }
}

const profileService = new ProfileService();
export default profileService;