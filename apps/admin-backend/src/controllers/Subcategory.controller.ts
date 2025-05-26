import { Request, Response } from 'express'
import { Subcategory } from '../models/Subcategory'
import { Category} from '../models/Category'

//POST /api/subcategory/create

export const createSubcategory = async (req: Request, res: Response) => {
    try {
        const { name, description, categoryId } = req.body;

        if(!name || !categoryId) {
            return res.status(400).json({ message: "Name and Category are required" });
        }

        const categoryExists = await Category.findById(categoryId);

        if(!categoryExists) {
            return res.status(404).json({ message: "Category not found"});
        }

        const subcategory = new Subcategory({ name, description, category: categoryId });
        await subcategory.save();

        return res.status(201).json(
            { 
                message: "Subcategory created successfully", 
                subcategory,
            }
        );
    } catch (error) {
        console.error("Error creating subcategory:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

//GET /api/subcategory/all

export const getAllSubcategories = async (req: Request, res: Response) => {
    try {
        const subcategories = await Subcategory.find().populate("category", "name slug").sort({ createdAt: -1 });

        return res.status(200).json(subcategories);
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        return res.status(500).json({ message: "Failed to fetch subcategories"});
    }
};