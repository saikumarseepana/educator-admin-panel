import mongoose, { Schema, Document } from "mongoose"
import slugify from "slugify"

export interface ICategory extends Document {
    name: string,
    description?: string,
    slug: string,
    iconUrl?: string,
}

const CategorySchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        description: {
            type: String,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
        },
        iconUrl: {
            type: String,
        },
    },
    { timestamps: true }
);

//Auto-generate slug from name
CategorySchema.pre<ICategory>("save", function (next) {
    if(!this.isModified("name")) return next();
    this.slug = slugify(this.name, { lower: true, strict: true });
    next();
});

export const Category = mongoose.model<ICategory>("Category", CategorySchema);