import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let client: MongoClient;
let dB: Db;
const dbName = "Ordinaria_Back";

export const connectToMongoDB = async () => {
    try{
        const mongoUrl = process.env.MONGO_URL;
        if(mongoUrl){
            client = new MongoClient(mongoUrl);
            await client.connect();
            dB = client.db(dbName);
            console.log("Estás conectado a mongolia");
        } else {
            throw new Error("MONGO_URL is not defined in environment variables");
        }
    }
    catch(err){
        console.log("Error de mongo ", err)
    }
};

export const getDB = ():Db => dB;