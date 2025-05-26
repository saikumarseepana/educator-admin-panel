import { z } from 'zod'

export const adminLoginSchema = z.object({
    email: z.string().email({ message: 'Invalid email format'}),
    password: z.string().min(6, { message: 'Password must be atleast 6 characters'})
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;