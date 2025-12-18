import { IResolvers } from "@graphql-tools/utils";
import { signToken } from "../auth";
import { User } from "../types";
import { getDB } from "../db/mongo";
import { ObjectId } from "mongodb";





export const resolvers: IResolvers = {
    Query: {
        me: async (_, __, { user }) => {
            if(!user) return null;
            return {
                _id: user._id.toString(),
                ...user
            }
        }
    },

    Mutation: {

    }
}