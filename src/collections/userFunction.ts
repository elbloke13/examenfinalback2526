import bcrypt from "bcryptjs";
import { getDB } from "../db/mongo";
import { TrainersCollection } from "../utils";

export const createUser = async (name: string, password: string) => {
    const db = getDB();
    const passwordHash = await bcrypt.hash(password, 10);

    const nameexists = await db.collection(TrainersCollection).findOne({name: name});
    if(nameexists) throw new Error("Entrenador ya existe")

    const result = await db.collection(TrainersCollection).insertOne({
        name,
        password: passwordHash,

    });

    return result.insertedId.toString();
}

export const validateUser = async (name: string, password: string) => {
    const db = getDB();

    const user = await db.collection(TrainersCollection).findOne({ name });
    if(!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) return null;
    return user;
}