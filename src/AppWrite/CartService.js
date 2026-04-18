import { Databases, ID, Query } from "appwrite";
import { AppWriteConfig } from "./AppwriteConfig";
import { confi } from "../confi/confi";

class CartService {
    client;
    databases;
    dbId = confi.Database_id;
    colId = confi.cart_collection;

    constructor() {
        this.client = AppWriteConfig;
        this.databases = new Databases(this.client);
    }

    async addToCart({ userId, productId, quantity, price }) {
        try {
            return await this.databases.createDocument(this.dbId, this.colId, ID.unique(), {
                userId,
                productId,
                quantity,
                price
            });
        } catch (error) {
            console.log("Appwrite Service :: addToCart :: error", error);
            throw error;
        }
    }

    async getUserCart(userId) {
        try {
            return await this.databases.listDocuments(this.dbId, this.colId, [
                Query.equal("userId", userId)
            ]);
        } catch (error) {
            console.log("Appwrite Service :: getUserCart :: error", error);
            return false;
        }
    }

    async updateQuantity(documentId, quantity) {
        try {
            return await this.databases.updateDocument(this.dbId, this.colId, documentId, { quantity });
        } catch (error) {
            console.log("Appwrite Service :: updateQuantity :: error", error);
        }
    }

    async removeItem(documentId) {
        try {
            await this.databases.deleteDocument(this.dbId, this.colId, documentId);
            return true;
        } catch (error) {
            console.log("Appwrite Service :: removeItem :: error", error);
            return false;
        }
    }
}

const cartService = new CartService();
export default cartService;