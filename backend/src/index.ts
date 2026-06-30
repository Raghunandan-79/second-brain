import "dotenv/config"
import express from "express";
import authRouter from "./routes/auth.js";
import mongoose from "mongoose";
import contentRouter from "./routes/content.js";
import brainRouter from "./routes/brain.js";
import cors from "cors";
const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));

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

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`App is running on port ${PORT}`);
    });

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    } catch (e) {
        console.log("Not able to connect to mongo DB", e);
    }
}

main();