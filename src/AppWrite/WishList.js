import { Databases, ID, Query } from "appwrite";
import { AppWriteConfig } from "./AppwriteConfig";

class WishlistService {
    client;
    databases;
    dbId = "YOUR_DATABASE_ID";
    colId = "wishlist";

    constructor() {
        this.client = AppWriteConfig;
        this.databases = new Databases(this.client);
    }

    async toggleWishlist(userId, productId) {
        try {
            const existing = await this.databases.listDocuments(this.dbId, this.colId, [
                Query.equal("userId", userId),
                Query.equal("productId", productId)
            ]);

            if (existing.total > 0) {
                await this.databases.deleteDocument(this.dbId, this.colId, existing.documents[0].$id);
                return { status: "removed" };
            } else {
                await this.databases.createDocument(this.dbId, this.colId, ID.unique(), { userId, productId });
                return { status: "added" };
            }
        } catch (error) {
            console.log("Appwrite Service :: toggleWishlist :: error", error);
        }
    }

    async getWishlist(userId) {
        try {
            return await this.databases.listDocuments(this.dbId, this.colId, [
                Query.equal("userId", userId)
            ]);
        } catch (error) {
            console.log("Appwrite Service :: getWishlist :: error", error);
        }
    }
}

const wishlistService = new WishlistService();
export default wishlistService;