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

    return await db.collection(PokemonsCollection).findOne({_id: result.insertedId})
}

/*
export const atrapar= async (pokemonId:string,nickname:string,userId:string) => {
    const comprobar= await collectionPokemon().findOne({_id: new ObjectId(pokemonId) })
    if(!comprobar) throw new Error ("el pokemon no existe") ;

    const ownerpokemon: OwnedPokemon ={
        _id: new ObjectId(),
        pokemon:new ObjectId(pokemonId),
        nickname,
        level:1
    }


    await coleccionUsuarios().updateOne({_id: new ObjectId(userId)},{
        $push : {pokemons:ownerpokemon}
    });

    return ownerpokemon;

    
}

export const eliminar = async (ownedPokemonId: string, userId: string) => {
  const result = await coleccionUsuarios().updateOne(
    { _id: new ObjectId(userId) },
    {
      $pull: {
        pokemons: { _id: new ObjectId(ownedPokemonId) } 
      }
    }
  );

  if (result.modifiedCount === 0) {
    throw new Error("No se encontró el OwnedPokemon para eliminar");
  }

  return await coleccionUsuarios().findOne({ _id: new ObjectId(userId) });
};*/