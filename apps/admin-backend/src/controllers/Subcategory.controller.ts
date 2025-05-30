import { Request, Response } from 'express'
import { SubCategory } from '../models/Subcategory'
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

        const subcategory = new SubCategory({ name, description, category: categoryId });
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
        const { categoryId } = req.params;

        if(!categoryId){
            return res.status(400).json({ message: "categoryId parameter is equired" });
        }

        const subcategories = await SubCategory.find({ category: categoryId }).populate("category", "name slug").sort({ createdAt: -1 });

        return res.status(200).json(subcategories);
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        return res.status(500).json({ message: "Failed to fetch subcategories"});
    }
};

// PUT /api/subcategory/update/:id

export const updateSubcategory = async (req: Request, res: Response)=> {
    try {
        const { id } = req.params;
        const { name, description, category } = req.body;

        const subcategory = await SubCategory.findById(id);

        if(!subcategory) {
            return res.status(404).json({ message: "Subcategory not found" });
        }

        if(name) {
            subcategory.name = name;
        }
        if(description) {
            subcategory.description = description;
        }
        if(category) {
            subcategory.category = category;
        }

        await subcategory.save();

        return res.status(200).json({ message: "Subcategory updated successfully" });

    }catch(error) {
        console.error("Error updating subcategory:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// DELETE /api/subcategory/delete/:id

export const deleteSubcategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const subcategory = await SubCategory.findByIdAndDelete(id);
        if(!subcategory){
            return res.status(404).json({ message: "Subcategory not found" });
        }

        return res.status(200).json({ message: "Subcategory deleted successfully" });
    } catch (error) {
        console.error("Error deleteing subcategory: ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};