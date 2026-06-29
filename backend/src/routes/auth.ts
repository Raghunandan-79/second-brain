import "dotenv/config"
import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET as string;
import { UserModel } from "../db.js";

const authRouter = Router();

authRouter.post("signup", async (req, res) => {
    const requiredBody = z.object({
        username: z.string().min(3).max(100),
        password: z.string().min(3).max(30).regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
            {
                message:
                    "Password must contain 1 uppercase, 1 lowercase, 1 number and 1 special character"
            }
        ),
    }).strict();

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        return res.json({
            message: "Incorrect form",
            error: parsedDataWithSuccess.error
        })
    }

    const { username, password } = req.body;

    let errorThrown = false;
    try {
        const hashedPassword = await bcrypt.hash(password, 5);

        await UserModel.create({
            username: username,
            password: hashedPassword
        });
    } catch(e) {
        res.status(400).json({
            message: "User with email already exists"
        });

        errorThrown = true;
    }   

    if (!errorThrown) {
        res.json({
            message: "Signup successful"
        })
    }
});

authRouter.post("/signin", async (req, res) => {
    const requiredBody = z.object({
        username: z.string().min(3).max(100),
        password: z.string().min(3).max(30),
    }).strict();

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if (!parsedDataWithSuccess.success) {
        return res.json({
            message: "Incorrect form",
            error: parsedDataWithSuccess.error
        })
    }

    const { email, password } = req.body;

    const user = await UserModel.findOne({
        email: email
    });

    if (!user) {
        return res.status(400).json({
            message: "User doesnot exists"
        })
    }

    const passwordMatched = await bcrypt.compare(password, user.password)

    if (passwordMatched) {
        const token = jwt.sign({
            id: user._id.toString()
        }, JWT_SECRET);

        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
});

export default authRouter;