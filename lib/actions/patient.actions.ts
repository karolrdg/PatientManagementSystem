'use server';
import { Query, ID } from "node-appwrite";
//import { parseStringify } from "../utils"
import { users } from "../appwrite.config"
import { parseStringify } from "../utils";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//CREATE
export const createUser = async (user: CreateUserParams) => {
    try {
      const newUser = await users.create(
        ID.unique(),
        user.email,
        user.phone,
        undefined,
        user.name
      );
  
      return newUser;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error && error?.code === 409) {
        const documents = await users.list([Query.equal("email", [user.email])]);
        return documents?.users[0];
      }
    }
  };

  //GET
  export const getUser = async (userId: string) => {
    try {
      const user = await users.get(userId);
  
      return parseStringify(user);
    } catch (error) {
      console.error(
        "An error occurred while retrieving the user details:",
        error
      );
    }
  };
