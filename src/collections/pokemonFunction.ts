import { ObjectId } from "mongodb";
import { PokemonType } from "../types";
import { TrainersCollection, PokemonsCollection, OwnedCollection} from "../utils";
import { getDB } from "../db/mongo";




export const crearPokemon= async (name:string,description:string,height:number,weight:number,types:PokemonType[]) => {

    const db = getDB();

    const result = await db.collection(PokemonsCollection).insertOne({
        name,
        description,
        height,
        weight,
        types,
    })

    return await db.collection(PokemonsCollection).findOne({_id: result.insertedId});
}

