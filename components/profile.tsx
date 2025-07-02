"use client";

import React, { use, useEffect, useState } from "react";
import { getloggedInUser, getUser, updateAvatar } from "@/lib/action/users.action"; 
import { Nunito_Sans} from 'next/font/google';
import {logoutAccount} from "@/lib/action/users.action";

import { useRouter } from "next/navigation";
const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '600', '700', '800', '900'], // Add desired weights
  style: ['normal', 'italic'], // Optional
  display: 'swap',
});

const AVATAR_FILES = Array.from({ length: 10 }, (_, i) => `avatar${i + 1}.jpeg`);


const Profile = () => {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
   const [editingAvatar, setEditingAvatar] = useState(false);
   useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        const authUser = await getloggedInUser();
        console.log("🔵 authUser from session:", authUser);

        if (!authUser?.$id) {
          throw new Error("No $id on logged in user");
        } 

        const fullUserDetails = await getUser(authUser.$id);
        setUser(fullUserDetails);
        
        setLoggedInUser(fullUserDetails);
      } catch (error) {
        console.error("🔴 Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetUser();
  }, []);

  const logoutUser = async () => {
    try {
      await logoutAccount();
      router.push("/sign-in");
    } catch (error) {
      console.error("🔴 Error logging out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading user details...</p>
      </div>
    );
  }

  if (!loggedInUser) {
    router.push("/sign-in");
    return null; 
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-4">
      <h1 className="text-4xl font-bold mb-6">Profile Page</h1>

      <div className=" p-6 rounded-lg shadow-md w-full max-w-2xl">

         <div className={`${nunitoSans.className}  text-2xl flex flex-col items-center mb-6`}>
        <img
          src={`/avatar/${user.avatar}`}
          alt="Avatar"
          className={`border-amber-100 border-4 w-30 h-30 rounded-full mb-2`}
        />
        {loggedInUser.username}
        <div className="font-semibold text-fuchsia-800 text-sm mb-4 mt-3 bg-gradient-to-r from-orange-400 to-yellow-200 hover:bg-red-600 hover:to-orange-500 border-amber-500 border-2 rounded-full px-4 py-1 cursor-pointer">

        <button onClick={logoutUser}>Logout</button>
        </div>
        </div>
        
        {/*<button
          onClick={() => setEditingAvatar(!editingAvatar)}
          className="text-sm text-blue-600"
        >
          {editingAvatar ? "Cancel" : "Change Avatar"}
        </button>
      
    
      {editingAvatar && (
        <div className="grid grid-cols-5 gap-2 mb-6">
          {AVATAR_FILES.map((file) => (
            <img
              key={file}
              src={`/avatar/${file}`}
              alt=""
              className={`w-16 h-16 rounded-full cursor-pointer border-2 ${
                user.avatar === file ? "border-blue-500" : "border-transparent"
              }`}
              onClick={async () => {
                await updateAvatar(file);      // Server action to update DB
                setUser({ ...user, avatar: file });
                setEditingAvatar(false);
              }}
            />
          ))}
        </div>
      )}*/}
        <div className="space-y-4">
          {[
            ["First Name", loggedInUser.firstName],
            ["Last Name", loggedInUser.lastName],
            ["Email", loggedInUser.email],
            ["Address", loggedInUser.address1],
            ["City", loggedInUser.city],
            ["State", loggedInUser.state],
            ["Postal Code", loggedInUser.postalCode],
            
          ].map(([label, value]) => (
            <div key={label} className={`${nunitoSans.className} flex flex-row border-b-2  pb-2 font-medium`}>
              <div className="font-semibold ml-2.5 ">{label}:</div>
              <div className="text-gray-700 ml-4">{value || "N/A"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
