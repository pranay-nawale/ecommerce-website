import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/Product.js";
import User from "./models/User.js";

dotenv.config();
await connectDB();

const adminEmail = "admin@shopsphere.com";
const adminPassword = "Admin@123";

const products = [
  {
    title: "Noise Cancelling Headphones",
    description: "Wireless headphones with 40-hour battery life and immersive sound.",
    price: 8999,
    category: "Electronics",
    stock: 35,
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80"],
    rating: 4.7,
    isFeatured: true
  },
  {
    title: "Smart Fitness Watch",
    description: "Track health, workouts, notifications, and sleep in one polished wearable.",
    price: 4999,
    category: "Wearables",
    stock: 48,
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80"],
    rating: 4.5,
    isFeatured: true
  },
  {
    title: "Everyday Laptop Backpack",
    description: "Water-resistant backpack with laptop sleeve and travel-ready organization.",
    price: 2199,
    category: "Fashion",
    stock: 80,
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80"],
    rating: 4.3
  }
];

await Product.deleteMany();
await Product.insertMany(products);
await User.deleteOne({ email: adminEmail });
await User.create({
  name: "ShopSphere Admin",
  email: adminEmail,
  password: adminPassword,
  role: "admin"
});

console.log("Seeded products");
console.log(`Admin login: ${adminEmail} / ${adminPassword}`);
process.exit(0);
