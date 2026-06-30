import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { ContentModel, LinkModel, UserModel } from "../db.js";
import { random } from "../utils.js";

const brainRouter = Router();

brainRouter.post("/share", authMiddleware, async (req, res) => {
    const share = req.body.share;

    if (share) {
        const existingLink = await LinkModel.findOne({
            userId: req.userId as string
        })

        if (existingLink) {
            return res.json({
                hash: existingLink.hash
            })
        }

        const hash = random(10);
        
        try {
            await LinkModel.create({
                userId: req.userId as string,
                hash: hash
            })
        } catch(e) {
            return res.status(400).json({
                message: "Unable to create link"
            })
        }

        res.json({
            hash
        })
    } else {
        try {
            await LinkModel.deleteOne({
                userId: req.userId as string
            })
        } catch(e) {
            return res.status(400).json({
                message: "Unable to remove link"
            })
        }

        res.json({
            message: "Removed link"
        })
    }
})

brainRouter.get("/:shareLink", async (req, res) => {
    const hash = req.params.shareLink as string;

    const link = await LinkModel.findOne({
        hash 
    });

    if (!link) {
        return res.status(411).json({
            message: "Sorry incorrect input"
        })
    }

    const content = await ContentModel.find({
        userId: link.userId
    })

    console.log(link)
    
    const user = await UserModel.findOne({
        _id: link.userId
    })

    if (!user) {
        return res.status(411).json({
            message: "User not found, error should ideally not happen"
        })
    }

    res.json({
        username: user.username,
        content: content
    })
})

export default brainRouter;