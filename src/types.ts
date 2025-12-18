import { ObjectId } from "mongodb";


export type Trainer = {
    _id?: ObjectId;
    name: string;
    pokemons:OwnedPokemon[];
}

export enum PokemonType{
    NORMAL = "NORMAL",
    FIRE = "FIRE",
    WATER = "WATER",
    GRASS = "GRASS",
    POISON = "POISON"

}

export type Pokemon ={
    _id?:ObjectId,
    name:string,
    description:string,
    height:number,
    weight:number,
    types:PokemonType[]
}

export type OwnedPokemon = {
    _id: ObjectId,
    pokemon:ObjectId,
    nickname:string,
    attack: number,
    defense: number,
    speed: number,
    special: number,
    level: number
}