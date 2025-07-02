"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Button } from "./ui/button";
import WeeklyCustominput from "./WeeklyCustomInput";
import { CarbonFootprintSchema } from "@/lib/validation";
import { Input } from "./ui/input";

type CarbonInput = z.input<typeof CarbonFootprintSchema>;

type CarbonOutput = z.infer<typeof CarbonFootprintSchema>;

const ActivityForm = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  const form = useForm<CarbonInput, any, CarbonOutput>({
    resolver: zodResolver(CarbonFootprintSchema),
    defaultValues: {
  Body_Type: "normal",
  Sex: "male",
  Diet: "omnivore",
  How_Often_Shower: "daily",
  Heating_Energy_Source: "electricity",
  Transport: "private",
  Vehicle_Type: "petrol",
  Social_Activity: "sometimes",
  Frequency_of_Traveling_by_Air: "never",
  Monthly_Grocery_Bill: 0,
  Vehicle_Monthly_Distance_Km: 0,
  Waste_Bag_Size: "small",
  Waste_Bag_Weekly_Count: 0,
  How_Long_TV_PC_Daily_Hour: 0,
  How_Many_New_Clothes_Monthly: 0,
  How_Long_Internet_Daily_Hour: 0,
  Energy_efficiency: "No",
  Recycling: [],
  Cooking_With: [],
},
  });

  const onSubmit: SubmitHandler<CarbonOutput> = async (values) => {
    try {
      const response = await axios.post("/api/carbonstore", values);
      
      setLoading(true);
    router.push("/Dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
      return;
      
    }

  };

  return (
    <section className="min-h-screen flex items-center justify-center relative w-full h-full">
      <Image
        src="/formbg.jpg"
        alt="Background"
        fill
        className="absolute inset-0 object-cover z-0"
      />
      <Card className="w-full p-8  bg-transparent  shadow-xl text-white z-10">
        <CardContent className="space-y-6 items-center justify-center">
          <div className="flex justify-center items-center">
            <Link href="/" className="text-2xl font-bold">
              Carbon Tracker form
            </Link>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-3 gap-6"
            >
              <WeeklyCustominput
                control={form.control}
                name="Body_Type"
                label="Body Type"
                placeholder="Select your Body Type"
                options={["underweight", "obese", "overweight", "normal"]}
                className="backdrop-blur-md w-2"
              />
              <WeeklyCustominput
                control={form.control}
                name="Sex"
                label="Sex"
                placeholder="Select your Sex"
                options={["male", "female"]}
                className="backdrop-blur-md bg-transparent"
              />

              <WeeklyCustominput
                control={form.control}
                name="Diet"
                label="Diet"
                placeholder="Select your Diet"
                options={["pescatarian", "vegetarian", "vegan", "omnivore"]}
                className="backdrop-blur-md"
              />

              <WeeklyCustominput
                control={form.control}
                name="How_Often_Shower"
                label="Shower Frequency"
                placeholder="Select your Shower Frequency"
                options={[
                  "daily",
                  "twice a day",
                  "less frequently",
                  "more frequently",
                ]}
                className="backdrop-blur-md"
              />

              <WeeklyCustominput
                control={form.control}
                name="Heating_Energy_Source"
                label="Heat Energy Source"
                placeholder="Select your Heat Energy Source"
                options={["electricity", "gas", "oil", "wood"]}
                className="backdrop-blur-md"
              />

              <WeeklyCustominput
                control={form.control}
                name="Transport"
                label="Transport Mode"
                placeholder="Select your Transport Mode"
                options={["walk/bicylce", "private", "public"]}
                className="backdrop-blur-md"
              />

              <WeeklyCustominput
                control={form.control}
                name="Vehicle_Type"
                label="Vehicle Type"
                placeholder="Select your Vehicle Type"
                options={["lpg", "diesel", "petrol", "electric", "hybrid"]}
                className="backdrop-blur-md"
              />

              <WeeklyCustominput
                control={form.control}
                name="Social_Activity"
                label="Social Activity"
                placeholder="Select your Social Activity Level"
                options={["never", "often", "sometimes"]}
                className="backdrop-blur-md"
              />

              <Controller
                control={form.control}
                name="Monthly_Grocery_Bill"
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium">
                      Monthly Grocery (USD)
                    </label>
                    <Input
                      type="number"
                      
                      value={Number.isNaN(+(field.value ?? "")) ? "" : field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      placeholder="Enter your Monthly Grocery Spending"
                      className="backdrop-blur-md"
                    />
                    {form.formState.errors.Monthly_Grocery_Bill && (
                      <p className="text-red-500">Expected number</p>
                    )}
                  </div>
                )}
              />

              <WeeklyCustominput
                control={form.control}
                name="Frequency_of_Traveling_by_Air"
                label="Airplane Frequency"
                placeholder="Select your Frequency of Airplane Last Month"
                options={["frequently", "very frequently", "rarely", "never"]}
                className="backdrop-blur-md"
              />

              <Controller
                control={form.control}
                name="Vehicle_Monthly_Distance_Km"
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium">
                      Vehicle Monthly Distance (km)
                    </label>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      placeholder="Enter your Vehicle Monthly Distance"
                      className="backdrop-blur-md"
                    />
                    {form.formState.errors.Vehicle_Monthly_Distance_Km && (
                      <p className="text-red-500">Expected number</p>
                    )}
                  </div>
                )}
              />
              <WeeklyCustominput
                control={form.control}
                name="Waste_Bag_Size"
                label="Waste Bag Size"
                placeholder="Select your Waste Bag Size"
                options={["small", "large", "extralarge"]}
                className="backdrop-blur-md"
              />

              <Controller
                control={form.control}
                name="Waste_Bag_Weekly_Count"
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium">
                      Waste Bag Weekly (Units)
                    </label>
                    <Input
                      type="number"
                      value={Number.isNaN(+(field.value ?? "")) ? "" : field.value ?? ""}
                      
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      placeholder="Enter your Waste Bag Weekly Consumption"
                      className="backdrop-blur-md"
                    />
                    {form.formState.errors.Waste_Bag_Weekly_Count && (
                      <p className="text-red-500">Expected number</p>
                    )}
                  </div>
                )}
              />

              <Controller
                control={form.control}
                name="How_Long_TV_PC_Daily_Hour"
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium">
                      TV or PC Hour Daily
                    </label>
                    <Input
                      type="number"
                      
                      value={Number.isNaN(+(field.value ?? "")) ? "" : field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      placeholder="Enter your TV or PC Hour Daily"
                      className="backdrop-blur-md"
                    />
                    {form.formState.errors.How_Long_TV_PC_Daily_Hour && (
                      <p className="text-red-500">Expected number</p>
                    )}
                  </div>
                )}
              />

              <Controller
                control={form.control}
                name="How_Long_Internet_Daily_Hour"
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium">
                      How Long Internet Daily (Hours)
                    </label>
                    <Input
                      type="number"
                      value={Number.isNaN(+(field.value ?? "")) ? "" : field.value ?? ""}
                      onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      placeholder="Enter your Daily Internet Usage"
                      className="backdrop-blur-md"
                    />
                    {form.formState.errors.How_Long_Internet_Daily_Hour && (
                      <p className="text-red-500">Expected number</p>
                    )}
                  </div>
                )}
              />
              <WeeklyCustominput
                control={form.control}
                name="Energy_efficiency"
                label="Energy Efficiency"
                placeholder="Select your Energy Efficiency Level"
                options={["Sometimes", "Yes", "No"]}
                className="backdrop-blur-md"
              />

              <Controller
                control={form.control}
                name="Recycling"
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium">
                      Recycling (kg)
                    </label>
                    <select
                      multiple
                      value={field.value}
                      onChange={(e) => {
                        const vals = Array.from(e.target.selectedOptions).map(
                          (o) => o.value
                        );
                        field.onChange(vals);
                      }}
                      className="w-full p-2 rounded-xl"
                    >
                      {[
                        "Paper",
                        "Plastic",
                        "Glass",
                        "Metal",
                        "Organic",
                        "Electronics",
                      ].map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {form.formState.errors.Recycling && (
                      <p className="text-red-500">Expected array</p>
                    )}
                  </div>
                )}
              />

              <Controller
                control={form.control}
                name="Cooking_With"
                render={({ field }) => (
                  <div>
                    <label className="block text-sm font-medium">
                      Cooking With
                    </label>
                    <select
                      multiple
                      value={field.value}
                      onChange={(e) => {
                        const vals = Array.from(e.target.selectedOptions).map(
                          (o) => o.value
                        );
                        field.onChange(vals);
                      }}
                      className="w-full p-2 rounded-xl"
                    >
                      {["Stove", "Oven", "Microwave", "Air Fryer", "Grill"].map(
                        (opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        )
                      )}
                    </select>
                    {form.formState.errors.Cooking_With && (
                      <p className="text-red-500">Expected array</p>
                    )}
                  </div>
                )}
              />
              <div className="col-span-3 flex justify-center">
                <Button
                  type="submit"
                  className="py-2 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white font-medium shadow-lg w-80"
                  disabled={isLoading}
                
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default ActivityForm;
