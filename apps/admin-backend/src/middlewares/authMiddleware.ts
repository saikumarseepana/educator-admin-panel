import { Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'hithereadmin';

interface JwtPayload {
    id: string;
    email: string;
    iat: number;
    exp: number;
}

declare global {
    namespace Express {
        interface Request{
            user ?: JwtPayload;
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized - No token Provided'});
    }

    const token = authHeader.split(' ')[1];
    console.log('Token received:', token);
    console.log('Using secret:', JWT_SECRET);

    try{
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        console.log('Decoded token:', decoded);
        req.user = decoded;
        next();
    } catch(err){
        return res.status(401).json({ message: 'Unauthorized - Invalid Token'});
    }
};