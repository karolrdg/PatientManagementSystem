'use server'
import { Query, ID } from "node-appwrite";
import { parseStringify } from "../utils"
import { users } from "../appwrite.config"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createUser = async (user: CreateUserParams) => {
try {
    const newUser = await users.create((ID.unique()),
        user.name,
        user.email,
        undefined,
        user.phone
    )
    console.log({newUser})

    return parseStringify(newUser)
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
catch (error:any) {
    if (error && error?.code === 409) {
        const existingUser = await users.list([
          Query.equal("email", [user.email]),
        ]);
  
        return existingUser.users[0];
      }
      console.error("An error occurred while creating a new user:", error);
     
    }
  };
