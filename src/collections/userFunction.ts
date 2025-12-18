import bcrypt from "bcryptjs";
import { getDB } from "../db/mongo";
import { USERS_COLLECTION } from "../utils";

export const createUser = async (email: string, password: string) => {
    const db = getDB();

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.collection(USERS_COLLECTION).insertOne({
        email,
        password: passwordHash,

    });

    return result.insertedId.toString();
}

export const validateUser = async (email: string, password: string) => {
    const db = getDB();

    const user = await db.collection(USERS_COLLECTION).findOne({ email });
    if(!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) return null;
    return user;
}