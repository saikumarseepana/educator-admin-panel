import { Request, Response } from 'express'
import { Topic } from '../models/Topic'
import { SubCategory } from '../models/Subcategory'

//POST /api/topic/create

export const createTopic = async(req: Request, res: Response)=> {
    try {
        const { title, content, videoUrl,subcategoryId } = req.body;

        if(!title || !subcategoryId){
            return res.status(400).json({ message: "Title and SubCategory are required"});
        }

        const subcategoryExists = await SubCategory.findById(subcategoryId);

        if(!subcategoryExists){
            return res.status(404).json({ message: "Subcategory not found"});
        }

        const topic = new Topic({
            title,
            content,
            videoUrl,
            subcategory: subcategoryId,
        });

        await topic.save();

        return res.status(201).json({ message: "Topic created successfully"});
    } catch (error) {
        console.error("Error creating topic: ", error);
        return res.status(500).json({ message: "Internal server error"});
    }
};

//GET /api/topic/subcategory/:subcategoryId

export const getTopicsBySubcategory = async (req: Request, res: Response)=> {
    try {
        const { subcategoryId } = req.params;

        const topics = await Topic.find({ subcategory: subcategoryId }).sort({ createdAt: -1 });

        return res.status(200).json(topics);
    }catch (error) {
        console.error("Error fetching topics: ", error);
        return res.status(500).json({ message: "Failed to fetch topics" });
    }
};