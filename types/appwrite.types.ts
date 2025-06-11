import { Models } from "node-appwrite";

export interface Users extends Models.Document {
   firstName: string;
   lastName: string;
   address1:string;
   city:string;
   state:string;
   postalCode:string;
   email:string;
   //sign-in
   username:string;

   password:string;
}