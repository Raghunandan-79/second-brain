import "dotenv/config"
import express from "express";
import authRouter from "./routes/auth.js";
import mongoose from "mongoose";
import contentRouter from "./routes/content.js";
import brainRouter from "./routes/brain.js";
const app = express();

app.use(express.json())

app.get("/", (req, res) => {
    res.json({
        message: "Server is up and running"
    })
})

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/", contentRouter);
app.use("/api/v1/brain/", brainRouter);

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