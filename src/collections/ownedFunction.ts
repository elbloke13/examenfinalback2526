import { ObjectId } from "mongodb";
import { PokemonType } from "../types";
import { TrainersCollection, PokemonsCollection, OwnedCollection} from "../utils";
import { getDB } from "../db/mongo";




export const atraparPokemon = async (pokemon: ObjectId, nickname: string, level: number) => {

    const db = getDB();

    const result = await db.collection(OwnedCollection).insertOne({
        pokemon,
        nickname,
        level,
    })

    return await db.collection(OwnedCollection).findOne({_id: result.insertedId})
}

