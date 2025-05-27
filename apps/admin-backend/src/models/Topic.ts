import mongoose, { Schema, Document } from 'mongoose'

export interface ITopic extends Document {
    title: string,
    content?: string,
    videoUrl?: string,
    subcategory: Schema.Types.ObjectId,
}

const TopicSchema = new Schema<ITopic>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
        },
        videoUrl: {
            type: String,
        },
        subcategory: {
            type: Schema.Types.ObjectId,
            ref: "SubCategory",
            required: true,
        },
    },
    { timestamps: true }
);

export const Topic = mongoose.model<ITopic>("Topic", TopicSchema);
