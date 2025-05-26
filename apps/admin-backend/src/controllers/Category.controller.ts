import { Request, Response } from 'express'
import { Category } from '../models/Category'

//POST /api/category/create

export const createCategory = async (req: Request, res: Response ) => {
    try {
        const { name, description, iconUrl } = req.body;

        if(!name) {
            return res.status(400).json({ message: "Name is required"});
        }

        const existing = await Category.findOne({ name });
        if(existing) {
            return res.status(400).json({ message: "Category already exists"});
        }

        const category = new Category({ name, description, iconUrl});
        await category.save();

        return res.status(201).json({ message: "Category created successfully", category,});

    } catch (error) {
        console.error("Error creating category: ", error);
        return res.status(500).json({ message: "Internal server error"});
    }
};

export const getAllCategories = async (req: Request, res: Response) => {
    console.log("getAllCategories called");
    try{
        console.log("User making request:", req.user);
        const categories = await Category.find().sort({ createdAt: -1});
        console.log("Categories found:", categories.length);
        return res.status(200).json(categories);
    }catch (error) {
        console.log("Error fetching categories", error);
        return res.status(500).json({ message: "Something went wrong while fetching categories"});
    }
}