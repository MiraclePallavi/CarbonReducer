'use server'
import {ID, Query} from "node-appwrite";
import { parseStringfy } from "../utils"; 
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers";
const {
  ENDPOINT,
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  USER_COLLECTION_ID,
  BUCKET_ID,
} = process.env;

export const SignIn = async({email, password}:LoginParams)=>{
    try {
         const { account } = await createAdminClient();
         const session = await account.createEmailPasswordSession(email, password);

    const isProd = process.env.NODE_ENV === "production";

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
    });

   
    return parseStringfy(session);
    } catch (error) {
        console.error("Error signing in:", error);
        throw error;
        
    }
}
export const SignUp = async({password,...userData}: CreateUserParams)=>{
    const {email, firstName, lastName, username} = userData;
    let newUserAccount;
    try {
        const {account, database} = await createAdminClient();
        newUserAccount = await account.create(
            ID.unique(),
            email,
            password,
            username,
        );
        if(!newUserAccount){
            throw new Error("Failed to create user account");
        }
        const newUser = await database.createDocument(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            ID.unique(),
            {
                ...userData,
                $id: newUserAccount.$id
            }
        )
        const session =  await account.createEmailPasswordSession(email, password);
        const isProd = process.env.NODE_ENV === "production";
       (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: isProd,
  });
        return parseStringfy(newUser);

    } catch (error) {
        console.error("Error creating user account:", error);
    
    }

}

export async function getloggedInUser (){
    try {
        const {account} = await createSessionClient();
        const user = await account.get();
        return parseStringfy(user);

    } catch (error) {
        console.error("Error getting logged in user:", error);
        return null;
        
    }
}
export const logoutAccount = async()=>{
    try {
        const {account} = await createSessionClient();
        (await cookies()).delete("appwrite-session");
        await account.deleteSession("current");
        
    } catch (error) {
        console.error("Error logging out:", error);
        return null;
    }
}
