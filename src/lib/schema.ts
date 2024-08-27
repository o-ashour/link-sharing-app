// could put this in /types.ts

import { z } from "zod"

export const signUpSchema = z
  .object({
    email: z.string().min(1, { message: 'Required' }).email(),
    password: z.string().min(1, { message: 'Required' }).min(8, { message: 'Must be at least 8 characters' }),
    confirmPassword: z.string().min(1, { message: 'Required' }).min(8, { message: 'Must be at least 8 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  })