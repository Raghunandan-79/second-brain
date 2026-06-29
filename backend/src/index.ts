import express from "express";
import { UserModel } from "./db.js";
import bcrypt from "bcrypt";
import zod from "zod";
const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "Hello world"
    })
})

app.post("/api/v1/signup", async (req, res) => {
    const requiredBody = zod.object({
        username: zod.string().min(3).max(100),
        password: zod.string().min(3).max(30).regex(
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
            password: password
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
})

app.post("/api/v1/signin", (req, res) => {

})

app.post("/api/v1/content", (req, res) => {

})

app.get("/api/v1/copntent", (req, res) => {

})

app.delete("/api/v1/content", (req, res) => {

})

app.post("/api/v1/brain/share", (req, res) => {

})

app.get("/api/v1/brain/:shareLink", (req, res) => {

})

app.listen(3000, () => {
    console.log("App is running on port 3000")
})