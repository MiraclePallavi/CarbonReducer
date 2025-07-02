import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// Sign-in schema
export const signInSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(8),
});

// Sign-up schema
export const signUpSchema = z.object({

  firstName:   z.string().min(3, "First name must be at least 3 characters"),
  lastName:    z.string().min(3, "Last name must be at least 3 characters"),
  address1:    z.string().min(3).max(100),
  city:        z.string().min(3).max(50),
  state:       z.string().min(2).max(20),
  postalCode:  z.string().min(3).max(6),
  username:    z.string().min(3).max(20),
  email:       z.string().email(),
  password:    z.string().min(8),
});


export const CarbonFootprintSchema = z.object({
   Body_Type: z.enum(['underweight', 'obese', 'overweight', 'normal']).default('normal'),
  Sex: z.enum(['male', 'female']).default('male'),
  Diet: z.enum(['pescatarian', 'vegetarian', 'vegan', 'omnivore']).default('omnivore'),
  How_Often_Shower: z.enum(['daily', 'twice a day', 'less frequently', 'more frequently']).default('daily'),
  Heating_Energy_Source: z.enum(['electricity', 'gas', 'oil', 'wood']).default('electricity'),
  Transport: z.enum(['walk/bicylce', 'private', 'public']).default('private'),
  Vehicle_Type: z.enum(['lpg', 'diesel', 'petrol', 'electric', 'hybrid']).default('petrol'),
  Social_Activity: z.enum(['never', 'often', 'sometimes']).default('sometimes'),
  Frequency_of_Traveling_by_Air: z.enum(['frequently', 'very frequently', 'rarely', 'never']).default('never'),
  Waste_Bag_Size: z.enum(['small', 'large', 'extralarge']).default('small'),
  Energy_efficiency: z.enum(['Sometimes', 'Yes', 'No']).default('No'),

  Monthly_Grocery_Bill: z.number().min(0).default(0),
  Vehicle_Monthly_Distance_Km: z.number().min(0).default(0),
  Waste_Bag_Weekly_Count: z.number().min(0).default(0),
  How_Long_TV_PC_Daily_Hour: z.number().min(0).max(24).default(0),
  How_Many_New_Clothes_Monthly: z.number().min(0).default(0),
  How_Long_Internet_Daily_Hour: z.number().min(0).max(24).default(0),

  Recycling: z.array(
    z.enum(['Paper', 'Plastic', 'Glass', 'Metal', 'Organic', 'Electronics'])
  ).default([]),

  Cooking_With: z.array(
    z.enum(['Stove', 'Oven', 'Microwave', 'Air Fryer', 'Grill'])
  ).default([]),

  })