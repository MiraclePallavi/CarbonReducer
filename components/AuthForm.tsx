'use client'
import { Card, CardContent } from "@/components/ui/card";
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import { z } from "zod"
 import {Loader2} from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { SignUp, SignIn, getloggedInUser, logoutAccount } from "@/lib/action/users.action";

import {
  Form,
} from "@/components/ui/form"

import Custominput from './Custominput'
import { signInSchema, signUpSchema } from "@/lib/validation";
import { useRouter } from 'next/navigation'
export default function AuthForm({ type }: { type: "sign-in" | "sign-up" }) {

  const router = useRouter()
    const [user, setuser] = useState<any>(null);
    const [isLoading, setLoading]= useState(false);

  
    const formSchema = type === "sign-in" ? signInSchema : signUpSchema;


  const form = useForm<z.infer<typeof signInSchema | typeof signUpSchema>>({
  resolver: zodResolver(type === "sign-in" ? signInSchema : signUpSchema),
  defaultValues: { email: "", password: "" },
});

// …

const onSubmit = async (data: z.infer<typeof signInSchema | typeof signUpSchema>) => {
  setLoading(true);
  try {
    if (type === "sign-in") {
      await SignIn({ email: data.email, password: data.password });
      setuser(await getloggedInUser());
      router.push("/Dashboard");
      
    } else {
      const signUpData = data as z.infer<typeof signUpSchema>;
      await SignUp({
       
        firstName: signUpData.firstName,
        lastName: signUpData.lastName,
        address1: signUpData.address1,
        city: signUpData.city,
        state: signUpData.state,
        postalCode: signUpData.postalCode,
        username: signUpData.username,
        email: signUpData.email,
        password: signUpData.password,
      });
      setuser(await getloggedInUser());
      router.push("/Dashboard/form");
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

      
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0F151F]">
       <div
    className="absolute inset-0 bg-cover bg-center z-0"
    style={{ backgroundImage: "url('/athhbg.jpg')" }}
  ></div>
      <Card className="w-full max-w-2xl p-8 bg-[#1A2330]/20 backdrop-blur-md rounded-2xl shadow-xl text-white">
        <CardContent className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <Link href="/" className="text-white text-2xl font-bold">
              Carbon Tracker
            </Link>
            <div className="text-right">
              <h2 className="text-white text-3xl font-semibold">
                {user
                  ? "Link Account"
                  : type === "sign-in"
                  ? "Sign In"
                  : "Sign Up"}
              </h2>
              <p className="text-green-300 text-sm font-bold">
                {user
                  ? "Link your account to get started"
                  : "Please enter your details"}
              </p>
            </div>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* email */}
              <Custominput
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your Email"
                className="bg-[#16202B] text-white rounded-xl placeholder-gray-200"
              />
              {/* Password */}
              <Custominput
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter password"
               
                className="bg-[#16202B] text-white rounded-xl placeholder-yellow-400"
              />

              {type === "sign-up" && (
                <>
                  {/* username */}
                  <Custominput
                control={form.control}
                name="username"
                label="Username"
                placeholder="Enter your Username"
                className="bg-[#16202B] text-white rounded-xl placeholder-gray-200"
              />
                 {/* First + Last */}
                  <div className="grid grid-cols-2 gap-4">
                    <Custominput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your First Name"
                      className="bg-[#16202B] text-white rounded-xl placeholder-gray-200"
                    />
                    <Custominput
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your Last Name"
                      className="bg-[#16202B] text-white rounded-xl placeholder-gray-200"
                    />
                  </div>

                  {/* Address + City */}
                  <Custominput
                    control={form.control}
                    name="address1"
                    label="Address"
                    placeholder="Enter your Address"
                    className="bg-[#16202B] text-white rounded-xl placeholder-gray-200"
                  />
                

                  {/* State + Postal */}
                  <div className="grid grid-cols-3 gap-4">
                      <Custominput
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your City"
                    className="bg-[#16202B] text-white rounded-xl placeholder-gray-200"
                  />
                    <Custominput
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Example: Bihar"
                      className="bg-[#16202B] text-white rounded-xl placeholder-gray-200"
                    />
                    <Custominput
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Example: 901503"
                      className="bg-[#16202B] text-white rounded-xl placeholder-gray-200"
                    />
                  </div>

                  {/* DOB + Email */}
                 
                  
                </>
              )}

              {/* Submit */}
              <Button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-medium shadow-lg flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                             <>
            <Loader2 size={20} className="animate-spin"/>
            &nbsp; Loading...

            </>
                ) : type === "sign-in" ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>

          {/* Footer */}
          <footer className="text-center text-gray-200">
            <span>
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="ml-1 text-blue-400 hover:text-blue-300"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </footer>
        </CardContent>
      </Card>
    </section>
  );
}

