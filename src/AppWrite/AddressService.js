import { Databases, ID, Query } from "appwrite";
import { AppWriteConfig } from "./AppwriteConfig";
import { confi } from "../confi/confi";

class AddressService {
    client;
    databases;
    dbId = confi.Database_id;
        colId = confi.address_collection;        

    constructor() {
        this.client = AppWriteConfig;
        this.databases = new Databases(this.client);
    }

    async saveAddress({ userId, fullName, street, city, state, zip, phone }) {
        try {
            return await this.databases.createDocument(this.dbId, this.colId, ID.unique(), {
                userId,
                fullName,
                street,
                city,
                state,
                zip,
                phone
            });
        } catch (error) {
            console.log("Appwrite Service :: saveAddress :: error", error);
            throw error;
        }
    }

    async getMyAddresses(userId) {
        try {
            const response = await this.databases.listDocuments(this.dbId, this.colId, [
                Query.equal("userId", userId),
                Query.orderDesc("$createdAt")
            ]);
            return response;
        } catch (error) {
            console.log("Appwrite Service :: getMyAddresses :: error", error);
            throw error;
        }
    }

    async updateAddress(documentId, addressData) {
        try {
            return await this.databases.updateDocument(this.dbId, this.colId, documentId, addressData);
        } catch (error) {
            console.log("Appwrite Service :: updateAddress :: error", error);
            throw error;
        }
    }

    async deleteAddress(documentId) {
        try {
            return await this.databases.deleteDocument(this.dbId, this.colId, documentId);
        } catch (error) {
            console.log("Appwrite Service :: deleteAddress :: error", error);
            throw error;
        }
    }
}

const addressService = new AddressService();
export default addressService;