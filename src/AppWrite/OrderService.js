import { Databases, ID, Query } from "appwrite";
import { AppWriteConfig } from "./AppwriteConfig";

class OrderService {
    client;
    databases;
    dbId = "YOUR_DATABASE_ID";
    colId = "orders";

    constructor() {
        this.client = AppWriteConfig;
        this.databases = new Databases(this.client);
    }

    async createOrder({ userId, products, totalAmount, address }) {
        try {
            return await this.databases.createDocument(this.dbId, this.colId, ID.unique(), {
                userId,
                products: JSON.stringify(products),
                totalAmount,
                address,
                status: "pending",
                paymentStatus: "pending"
            });
        } catch (error) {
            console.log("Appwrite Service :: createOrder :: error", error);
            throw error;
        }
    }

    async getMyOrders(userId) {
        try {
            return await this.databases.listDocuments(this.dbId, this.colId, [
                Query.equal("userId", userId),
                Query.orderDesc("$createdAt")
            ]);
        } catch (error) {
            console.log("Appwrite Service :: getMyOrders :: error", error);
        }
    }
}

const orderService = new OrderService();
export default orderService;