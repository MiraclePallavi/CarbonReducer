import React from 'react'
import ActivityForm from '@/components/Activityform'
import Navbar from '@/components/navbar'
import { redirect } from 'next/navigation';
import { getloggedInUser } from '@/lib/action/users.action';

const page = async () => {
   const loggedInUser = await getloggedInUser();

   if(!loggedInUser){
     redirect("/sign-in");
   }
   
  return (
    <div>

      <ActivityForm />

    </div>
  )
}

export default page
