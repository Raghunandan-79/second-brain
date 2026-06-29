import "dotenv/config"
import express from "express";
import authRouter from "./routes/auth.js";
import mongoose from "mongoose";
const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "Server is up and running"
    })
})

app.use("/api/v1/auth", authRouter);

app.post("/api/v1/content", (req, res) => {

});

app.get("/api/v1/content", (req, res) => {

});

app.delete("/api/v1/content", (req, res) => {

});

app.post("/api/v1/brain/share", (req, res) => {

});

app.get("/api/v1/brain/:shareLink", (req, res) => {

});


async function main() {
    if (!process.env.MONGO_URI) {
        throw new Error("MONGO_URI is not defined in environment variables");
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(3000, () => {
            console.log("App is running on port 3000");
        });
    } catch (e) {
        console.log("Not able to connect to mongo DB", e);
    }
}

main();