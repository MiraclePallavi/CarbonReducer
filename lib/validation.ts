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
  state:       z.string().min(2).max(2),
  postalCode:  z.string().min(3).max(6),
  username:    z.string().min(3).max(20),
  email:       z.string().email(),
  password:    z.string().min(8),
});
export const weeklyUpdateSchema = z.object({
  electricityKwh: z.coerce.number(),
  cookingFuelL: z.coerce.number(),
  heatingKwh: z.coerce.number(),
  drivingKm: z.coerce.number(),
  publicTransportKm: z.coerce.number(),
  flightsKm: z.coerce.number(),
  wasteKg: z.coerce.number(),
  waterL: z.coerce.number(),
  purchasesSpend: z.coerce.number(),
})

export const weeklyUpdateOutput = weeklyUpdateSchema.extend({
  userId:    z.string(),
  updatedAt: z.coerce.date(),
});



export const dailyCheckinInputSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), 

  deviations: z.object({
    drivingKm:      z.number().optional(),
    electricityKwh: z.number().optional(),
    meatMeals:      z.number().optional(),
    vegMeals:       z.number().optional(),
    veganMeals:     z.number().optional(),
  })
  .partial()
  .default({}),

  quickEvents: z.object({
    bikedToday:     z.boolean().optional(),
    recycled:       z.boolean().optional(),

  })
  .partial()
  .default({}),
});
