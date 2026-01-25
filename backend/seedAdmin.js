// seedAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Users from "./src/models/Users.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/IMS_DB";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected ✅");

    const existing = await Users.findOne({ email: "admin@mail.com" });

    if (existing) {
      console.log("Admin already exists ✅");
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await Users.create({
      name: "Admin",
      email: "admin@mail.com",
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    console.log("Admin user created successfully ✅");
    console.log(`Email: ${admin.email}`);
    console.log(`Password: Admin@123`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();
