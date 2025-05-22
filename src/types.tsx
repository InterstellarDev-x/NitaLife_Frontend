import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});


export interface poststore {
  id? : string
  name: string;
  address: string;
  imageUrl: string;
  phoneno: number;
  Descrption: string; 
}