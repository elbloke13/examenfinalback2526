import { ObjectId } from "mongodb";
import { PokemonType } from "../types";
import { TrainersCollection, PokemonsCollection, OwnedCollection} from "../utils";
import { getDB } from "../db/mongo";
import { getUserFromToken } from "../auth";




export const atraparPokemon = async (pokemon: ObjectId, nickname: string, trainerid: string ) => {

    const db = getDB();

    const pokemonexists = await db.collection(PokemonsCollection).findOne({_id: pokemon});
    if(pokemonexists) throw new Error("Pokemon inventao");


    const result = await db.collection(OwnedCollection).insertOne({
        pokemon,
        nickname,
        attack: Math.floor(Math.random() * 100),
        defense: Math.floor(Math.random() * 100),
        level: Math.floor(Math.random() * 100),
        speed:Math.floor(Math.random() * 100),
        special:Math.floor(Math.random() * 100),
    })

    await db.collection(TrainersCollection).updateOne(
        { _id: new ObjectId(trainerid) },
        { $addToSet: { pokemons: result.insertedId } }
    );

    return db.collection(OwnedCollection).findOne({_id: result.insertedId});
}


export const liberarPokemon = async (pokemonid: string , trainerId: string) => {

    const db = getDB();

    const pokemoncap = await db.collection(OwnedCollection).findOne({_id: new ObjectId(pokemonid)});
    if(!pokemoncap) throw new Error("Pokemon no existe");

    await db.collection(OwnedCollection).deleteOne({ _id: new ObjectId(pokemonid) });

    const result = await db.collection(TrainersCollection).updateOne(
        { _id: new ObjectId(trainerId) },
        { $addToSet: { pokemons: new ObjectId(pokemonid) } }
    );

    if (result.modifiedCount === 0) throw new Error("Owned Pokemon not found for this trainer");

    

    return await db.collection(TrainersCollection).findOne({ _id: new ObjectId(trainerId) });

}