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

    async addToCart({title,thumbnail, id, quantity, price },userId) {
        try {
            
            return await this.databases.createDocument(this.dbId, this.colId, ID.unique(), {
                userId:userId,
                productId:id,
                quantity,
                price,
                title,
                thumbnail

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
            
        }
    }

async updateQuantityByProductId(productId="3", newQty) {
    try {
        // 1. Find the document with the matching productId
        const response = await this.databases.listDocuments(
            this.dbId,
            this.colId,
            [Query.equal("productId", productId)]
        );

        if (response.documents.length === 0) {
            throw new Error("Product not found in cart");
        }
        if(response)
        {
            console.log(response)
        }

        // 2. Get the Appwrite Document ID ($id)
        const documentId = response.documents[0].$id;
        console.log(documentId)

        // 3. Update using the internal Document ID
        return await this.databases.updateDocument(
            this.dbId,
            this.colId,
            documentId,
            { quantity: newQty }
        );
    } catch (error) {
        console.error("Service :: updateByProductId :: error", error);
        throw error;
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