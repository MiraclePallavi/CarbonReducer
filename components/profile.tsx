"use client";

import React, { useEffect, useState } from "react";
import { getloggedInUser } from "@/lib/action/users.action";

interface UserDetails {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  username: string;
  email: string;
}
const Profile = () => {
     const [loggedInUser, setLoggedInUser] = useState<UserDetails | null>(null);
  useEffect(() => {
    getloggedInUser().then(user => {
         console.log('Fetched User:', user)
      if (user) {
        setLoggedInUser({
          firstName: user.prefs.firstName,
          lastName: user.prefs.lastName,
          address1: user.prefs.address1,
          city: user.prefs.city,
          state: user.prefs.state,
          postalCode: user.prefs.postalCode,
          username: user.prefs.username,
          email: user.prefs.email,
        });
      }
    });
  }, []);

  if (!loggedInUser) {
    return <div className="flex items-center justify-center min-h-screen text-lg">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200 p-4">
      <h1 className="text-4xl font-bold mb-6">Profile Page</h1>
      <p className="text-lg text-gray-700 mb-6">Detailed User Information</p>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-4">User Details</h2>

        <div className="space-y-4">
          <div className="flex flex-col border-b pb-2">
            <span className="font-semibold">First Name:</span>
            <span className="text-gray-700">{loggedInUser.firstName}</span>
          </div>

          <div className="flex flex-col border-b pb-2">
            <span className="font-semibold">Last Name:</span>
            <span className="text-gray-700">{loggedInUser.lastName}</span>
          </div>

          <div className="flex flex-col border-b pb-2">
            <span className="font-semibold">Address:</span>
            <span className="text-gray-700">{loggedInUser.address1}</span>
          </div>

          <div className="flex flex-col border-b pb-2">
            <span className="font-semibold">City:</span>
            <span className="text-gray-700">{loggedInUser.city}</span>
          </div>

          <div className="flex flex-col border-b pb-2">
            <span className="font-semibold">State:</span>
            <span className="text-gray-700">{loggedInUser.state}</span>
          </div>

          <div className="flex flex-col border-b pb-2">
            <span className="font-semibold">Postal Code:</span>
            <span className="text-gray-700">{loggedInUser.postalCode}</span>
          </div>

          <div className="flex flex-col border-b pb-2">
            <span className="font-semibold">Username:</span>
            <span className="text-gray-700">{loggedInUser.username}</span>
          </div>

          <div className="flex flex-col border-b pb-2">
            <span className="font-semibold">Email:</span>
            <span className="text-gray-700">{loggedInUser.email}</span>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Profile;
