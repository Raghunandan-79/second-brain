import "dotenv/config";
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, JWT_SECRET);

    if (decoded) {
        //@ts-ignore
        req.userId = decoded.id;
        next()
    } else {
        res.status(403).json({
            message: "You are not logged in"
        })
    }
}