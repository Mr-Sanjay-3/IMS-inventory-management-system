//that was seed Admin credentials into db its example : first time of accsses to need admin crdit its problem
//alredy admin crdit have db its match then ender app so first of need to seed admin cridt into db so the file as run to create admin crdentials into db 
//Your  terminal : node seedAdmin.js        <run the cmd terminal then automatcaly crate admin data

// seedAdmin.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Users from "./src/models/Users.js";

import dns from 'node:dns'
dns.setServers(['1.1.1.1', '8.8.8.8']);
dotenv.config();

const MONGO_URI = process.env.MONGO_URI ;

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected ✅");

    const existing = await Users.findOne({ email: "admininfo@mail.com" });

    if (existing) {
      console.log("Admin already exists ✅");
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    const admin = await Users.create({
      name: "Admin",
      email: "admininfo@mail.com",
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
