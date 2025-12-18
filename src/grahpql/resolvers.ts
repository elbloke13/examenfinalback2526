import { IResolvers } from "@graphql-tools/utils";
import { signToken } from "../auth";
import { Trainer } from "../types";
import { getDB } from "../db/mongo";
import { ObjectId } from "mongodb";
import { createUser, validateUser } from "../collections/userFunction";
import { crearPokemon } from "../collections/pokemonFunction";
import { OwnedCollection, PokemonsCollection } from "../utils";
import { atraparPokemon } from "../collections/ownedFunction";





export const resolvers: IResolvers = {
    Query: {
        me: async (_, __, { user }) => {
            if(!user) return null;
            return {
                _id: user._id.toString(),
                ...user
            }
        },
        pokemons: async () => {
            const db = getDB();
            return db.collection(PokemonsCollection).find().toArray()
        },
        pokemon: async (_, { id }) => {
            const db = getDB();
            const pokemon = db.collection(PokemonsCollection).findOne({_id: new ObjectId(id)});
            if(!pokemon) return null;

            return pokemon;
        }
    },

    Mutation: {
        startJourney: async (_, { name, password }) => {
            const userId = await createUser(name, password);
            return signToken(userId);
        },
        login: async (_,{name,password}) => {
            const trainer = await validateUser(name,password);
            if(!trainer) return null;

            return signToken(trainer._id.toString());
        },
        createPokemon: async (_,{name,description,height,weight,types}) => {
            const result = await crearPokemon(name,description,height,weight,types);
            if(!result) return null;

            return result;

        },
        catchPokemon : async (_,{pokemonId,nickname},{user}) => {
            if(!user) throw new Error ("inicia sesion porfavor");
            
            const result = await atraparPokemon(pokemonId,nickname,user._id)
            return result;
        }
    },

    Trainer: { 
        pokemons: async (trainer:Trainer) => {
            return trainer.pokemons || [];
        }

    },

    OwnedPokemon : {
         pokemon: async (owned) => {
            const db = getDB();
            const pokemon = await db.collection(OwnedCollection).findOne({ _id: owned.pokemon });
            if (!pokemon) throw new Error("El Pokémon asociado no existe");
            return pokemon;
        }
    },
}