import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { ContentModel, UserModel } from "../db.js";

const contentRouter = Router();

contentRouter.post("/content", authMiddleware, async (req, res) => {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;

    try {
        await ContentModel.create({
            link,
            type,
            title,
            tags: [],
            //@ts-ignore
            userId: req.userId,
        });
    } catch(e) {
        return res.status(400).json({
            message: "Unable to create content"
        });
    }

    return res.json({
        message: "content added"
    })
})

contentRouter.get("/content", authMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")

    res.json({
        content
    })
})

contentRouter.delete("/content", authMiddleware, async (req, res) => {
    const contentId = req.body.contentId;

    try {
        await ContentModel.deleteMany({
            _id: contentId,
            //@ts-ignore
            userId: req.userId
        })
    } catch(e) {
        return res.status(400).json({
            message: "Unable to delete content"
        })
    }

    res.json({
        message: "Content deleted successfully"
    })
})

export default contentRouter