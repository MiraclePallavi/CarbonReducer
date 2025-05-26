'use client'
import { Card, CardContent } from "@/components/ui/card";


import Link from 'next/link'

import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import { z } from "zod"
 import {Loader2} from 'lucide-react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import Custominput from './Custominput'
import { authFormSchema } from '@/lib/utils'
import { useRouter } from 'next/navigation'

const AuthForm = ({type}:{type:string}) => {
  const router = useRouter()
    const [user, setuser] = useState(null);
    const [isLoading, setLoading]= useState(false);

  
  
  const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password:"",
        },
      })
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
      
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
              {/* Username */}
              <Custominput
                control={form.control}
                name="username"
                label="Username"
                placeholder="Enter your Username"
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
                  <Custominput
                    control={form.control}
                    name="dateOfBirth"
                    label="Date Of Birth"
                    placeholder="YYYY-MM-DD"
                    
                    className="bg-[#16202B] text-white rounded-xl placeholder-gray-200"
                  />
                  <Custominput
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="Enter your Email"
                    className="bg-[#16202B] text-white rounded-xl placeholder-gray-200"
                  />
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
export default AuthForm