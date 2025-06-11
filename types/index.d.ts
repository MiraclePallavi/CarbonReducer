/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  
  
  declare interface CreateUserParams {
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
  declare interface User extends CreateUserParams {
    $id: string;
  }
  declare interface LoginParams{
    email: string;
    password: string;
  }

  
 
  
