import mongoose, { Schema, Document } from 'mongoose'

export interface ISubcategory extends Document {
    name: string,
    description?: string,
    category: mongoose.Types.ObjectId
}

const SubcategorySchema: Schema = new Schema (
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
    },
    { timestamps: true}
);

export const Subcategory = mongoose.model<ISubcategory>("Subcategory", SubcategorySchema);