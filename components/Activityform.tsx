'use client'
import { Card, CardContent } from "@/components/ui/card";


import Link from 'next/link'

import React from 'react'
import { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Image from "next/image";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import WeeklyCustominput from './WeeklyCustomInput'
import { weeklyUpdateSchema } from '@/lib/validation'
import { useRouter } from 'next/navigation'
import { Button } from "./ui/button";

const ActivityForm = ({type}:{type:string}) => {
  const router = useRouter()
    const [user, setuser] = useState(null);
    const [isLoading, setLoading]= useState(false);

  
  
  const formSchema = weeklyUpdateSchema;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
    electricityKwh: 0,
    cookingFuelL: 0,
    heatingKwh: 0,
    drivingKm: 0,
    publicTransportKm: 0,
    flightsKm: 0,
    wasteKg: 0,
    waterL: 0,
    purchasesSpend: 0,
  },
        
      })
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {

    router.push('/Dashboard')
    console.log(values)
  }
      
  return (
    <section className="min-h-screen flex items-center justify-center relative w-full h-full">
       <Image
       src="/pattern.svg"
       alt="Background Image"
       layout="fill"
       objectFit="cover"
       className="absolute inset-0 z-0"
     />
      <Card className="w-full max-w-2xl p-8 backdrop-blur-md rounded-2xl shadow-xl bg-green-100 text-black">
        <CardContent className="space-y-6 gap-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <Link href="/" className="text-white text-2xl font-bold">
              Weekly Tracker Form
            </Link>
            
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 grid grid-cols-2 gap-4"
            >
              {/* Username */}
              <WeeklyCustominput
                control={form.control}
                name="electricityKwh"
                label="Electricity (kWh)"
                placeholder="Enter your Electricity Consumption"
                className="bg-[#16202B] text-black rounded-xl placeholder-gray-200"
              />

              {/* Password */}
              <WeeklyCustominput
                control={form.control}
                name="cookingFuelL"
                label="Cooking Fuel (L)"
                placeholder="Enter your Cooking Fuel Consumption"
                className="bg-[#16202B] text-black rounded-xl placeholder-yellow-400"
              />
               <WeeklyCustominput
                control={form.control}
                name="heatingKwh"
                label="Heating (kWh)"
                placeholder="Enter your Heating Consumption"
                className="bg-[#16202B] text-black rounded-xl placeholder-yellow-400"
              />
               <WeeklyCustominput
                control={form.control}
                name="drivingKm"
                label="Driving (km)"
                placeholder="Enter your Driving Distance"
                className="bg-[#16202B] text-black rounded-xl placeholder-yellow-400"
              />
               <WeeklyCustominput
                control={form.control}
                name="publicTransportKm"
                label="Public Transport (km)"
                placeholder="Enter your Public Transport Distance"
                className="bg-[#16202B] text-black rounded-xl placeholder-yellow-400"
              />
               <WeeklyCustominput
                control={form.control}
                name="flightsKm"
                label="Flights (km)"
                placeholder="Enter your Flights Distance"
                className="bg-[#16202B] text-black rounded-xl placeholder-yellow-400"
              /> <WeeklyCustominput
                control={form.control}
                name="wasteKg"
                label="Waste (kg)"
                placeholder="Enter your Waste Generation"
               className="bg-[#16202B] text-black rounded-xl placeholder-yellow-400"
              />
               <WeeklyCustominput
                control={form.control}
                name="waterL"
                label="Water (L)"
                placeholder="Enter your Water Consumption"

                className="bg-[#16202B] text-black rounded-xl placeholder-yellow-400"
              />

            <WeeklyCustominput
                control={form.control}
                name="purchasesSpend"
                label="Purchases (USD)"
                placeholder="Enter your Purchases Spending"
                className="bg-[#16202B] text-black rounded-xl placeholder-yellow-400"
              />

             
 <Button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-medium shadow-lg flex items-center justify-center"
                disabled={isLoading}
              >
                Submit
              </Button>
            </form>
          </Form>

          {/* Footer */}
          
        </CardContent>
      </Card>
    </section>
  );
}
export default ActivityForm;