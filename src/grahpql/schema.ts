import { gql } from "apollo-server";



export const typeDefs = gql`


    enum PokemonType {
        NORMAL
        FIRE
        WATER
        GRASS
        ELECTRIC
        ICE
        FIGHTING
        POISON
        GROUND
        FLYING
        PSYCHIC
        BUG
        ROCK
        GHOST
        DRAGON
        DARK
        STEEL
        FAIRY
    }

    type Pokemon {
        _id: ID!
        name: String!
        description: String!
        height: Float!
        weight: Float!
        types: [PokemonType!]!
    }

    type Trainer {
        _id: ID!
        name: String!
        pokemons: [OwnedPokemon]!
    }
    
    type OwnedPokemon {
        _id: ID!
        pokemon: Pokemon!
        nickname: String
        attack: Int!
        defense: Int!
        speed: Int!
        special: Int!
        level: Int!
    }


    type Query {
        me: Trainer
        pokemons(page: Int, size: Int): [Pokemon]!
        pokemon(id: ID!): Pokemon
    }

    type Mutation {
    startJourney(name: String!, password: String!): String!
    login(name: String!, password: String!): String!
    createPokemon(name: String!,description: String!,height: Float!,weight: Float!,types: [PokemonType!]!): Pokemon!
    catchPokemon(pokemonId: ID!, nickname: String): OwnedPokemon!
    }
`