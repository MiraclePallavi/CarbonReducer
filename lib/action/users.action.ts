'use server'
import {ID, Query, Permission, Role} from "node-appwrite";
import { parseStringfy } from "../utils"; 
import { createAdminClient, createSessionClient, databases } from "../appwrite"
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

const AVATAR_FILES = Array.from({ length: 10 }, (_, i) => `avatar${i + 1}.jpeg`);
export const SignUp = async({password,...userData}: CreateUserParams)=>{
    const {email, firstName, lastName, username, address1, city, state, postalCode} = userData;
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
          const randomAvatar =
    AVATAR_FILES[Math.floor(Math.random() * AVATAR_FILES.length)];
       const newUser = await database.createDocument(
  DATABASE_ID!,
  USER_COLLECTION_ID!,
  newUserAccount.$id,
  {
    firstName,
    lastName,
    address1,
    city,
    state,
    postalCode,
    email,
    username,
    avatar: randomAvatar,
  },
  [
    Permission.read(Role.user(newUserAccount.$id)),
    Permission.update(Role.user(newUserAccount.$id)),
    
  ]

);
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
export const getUser = async (userId: string) => {
  try {
    const userDoc = await databases.getDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      userId
    );
    return parseStringfy(userDoc);
  } catch (error) {
    console.error(" getUser error or not found:", error);
    throw error;
  }
};


export async function updateAvatar(avatarFilename: string) {
  const { account, database } = await createSessionClient();
  const user = await account.get();
  await database.updateDocument(
    DATABASE_ID!,
    USER_COLLECTION_ID!,
    user.$id,
    { avatar: avatarFilename }
  );

  return avatarFilename;
}

export const logoutAccount = async () => {
  try {
    const session = (await cookies()).get('appwrite-session');

    if (!session || !session.value) {
      console.warn("No active session found.");
      return; 
    }

    const { account } = await createSessionClient();

    await account.deleteSession('current');
    (await cookies()).delete('appwrite-session');
    
    console.log("Logged out successfully.");
  } catch (error) {
    console.error("Error logging out:", error);
    return null;
  }
}
