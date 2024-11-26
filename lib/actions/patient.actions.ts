"use server";
import { Query, ID } from "node-appwrite";
//import { parseStringify } from "../utils"
import { InputFile } from "node-appwrite/file";
import { users } from "../appwrite.config";
import { parseStringify } from "../utils";
import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
} from "../appwrite.config";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
//CREATE
export const createUser = async (
  user: CreateUserParams
) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newUser); // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([
        Query.equal("email", [user.email]),
      ]);
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

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get(
          "blobFile"
        ) as Blob,
        identificationDocument?.get(
          "fileName"
        ) as string
      );

      file = await storage.createFile(
        BUCKET_ID!,
        ID.unique(),
        inputFile
      );
    }

    const newPatient =
      await databases.createDocument(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        ID.unique(),
        {
          identificationDocumentId:
            file?.$id || null,
          identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
          ...patient,
        }
      );

    return parseStringify(newPatient);
  } catch (error) {
    console.log(error);
  }
};

// GET PATIENT
export const getPatient = async (
  userId: string
) => {
  try {
    const patients =
      await databases.listDocuments(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        [Query.equal("userId", userId)]
      );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.log(error);
  }
};
