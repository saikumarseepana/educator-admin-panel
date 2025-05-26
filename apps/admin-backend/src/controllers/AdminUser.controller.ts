import { Request, Response } from 'express'
import { adminLoginSchema } from '../validations/AdminUser.schema'
import { AdminUser } from '../models/AdminUser'
import { ZodError} from 'zod'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'hithereadmin';

export const adminLoginController = async (req: Request, res: Response) => {
    try {
        const parsedData = adminLoginSchema.parse(req.body);

        console.log("Login Attempt:", parsedData);

        const user = await AdminUser.findOne({ email: parsedData.email});
        if(!user) {
            console.log("userNot found");
            return res.status(401).json({ message: 'Invalid email' });
        }

        console.log("user found:", user.email);
        console.log("stored hashed password:", user.password);
        console.log("password to compare:", parsedData.password);

        const isPasswordCorrect = await bcrypt.compare(parsedData.password, user.password);
        
        console.log("Is Password Correct:", isPasswordCorrect);

        if(!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid Password'});
        }

        const token = jwt.sign(
            {
            id: user._id,
            email: user.email
            },
            process.env.JWT_SECRET!,
            {
            expiresIn: '1h'
            }
        );
        return res.status(200).json({ message: 'Login successful', token, admin: {id: user._id, email: user.email}});
    } catch (error) {
        if(error instanceof ZodError) {
            return res.status(400).json({ message: 'Validation failed', errors: error.errors});
        }

        console.error('Login error:', error);
        return res.status(500).json({ message: 'Something went wrong'});
    }
};