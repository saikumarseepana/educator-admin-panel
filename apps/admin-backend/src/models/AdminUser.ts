import mongoose, { Document, Schema } from "mongoose"
import bcrypt from "bcrypt"

export interface IAdminUser extends Document {
    email : string;
    password : string;
    name?: string;
    role: "admin" | "superadmin";
    status: "active" | "inactive";
    comparePassword : (candidatePassword : string) => Promise<boolean>;
    createdAt: Date;
    updatedAt: Date;
}

const AdminUserSchema : Schema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password : {
        type: String,
        required: true
    },
    name: {
        type: String,
        default: '',
    },
    role: {
        type: String,
        enum: ["admin", "superadmin"],
        default: "admin",
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active",
    },
}, 
{ timestamps: true})
;

//Hashing the password before saving to the database
AdminUserSchema.pre<IAdminUser>('save', async function (next) {
    if(!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//comparing password
AdminUserSchema.methods.comparePassword = function(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export const AdminUser = mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);