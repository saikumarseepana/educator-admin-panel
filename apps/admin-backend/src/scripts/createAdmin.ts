import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { AdminUser } from '../models/AdminUser';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/adminpanel';

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('DB connected ✅');

    const email = 'admin@example.com';
    const rawPassword = 'admin@123';
    // const hashedPassword = await bcrypt.hash(rawPassword, 10);

    await AdminUser.deleteMany({ email });//deletes existing user with same email

    const admin = await AdminUser.create({email, password: rawPassword});
    
    console.log('Dummy admin created 🎉', {
      email: admin.email,
      hashedPassword: admin.password,
    });
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();
