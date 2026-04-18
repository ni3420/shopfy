import { Databases, Query } from "appwrite";
import { AppWriteConfig } from "./AppwriteConfig";

class ProductService {
    client;
    databases;
    dbId = "YOUR_DATABASE_ID";
    colId = "products";

    constructor() {
        this.client = AppWriteConfig;
        this.databases = new Databases(this.client);
    }

    async getAllProducts() {
        try {
            return await this.databases.listDocuments(this.dbId, this.colId);
        } catch (error) {
            console.log("Appwrite Service :: getAllProducts :: error", error);
            return false;
        }
    }

    async getProduct(productId) {
        try {
            return await this.databases.getDocument(this.dbId, this.colId, productId);
        } catch (error) {
            console.log("Appwrite Service :: getProduct :: error", error);
            return false;
        }
    }

    async getProductsByCategory(category) {
        try {
            return await this.databases.listDocuments(this.dbId, this.colId, [
                Query.equal("category", category)
            ]);
        } catch (error) {
            console.log("Appwrite Service :: getProductsByCategory :: error", error);
            return false;
        }
    }
}

const productService = new ProductService();
export default productService;