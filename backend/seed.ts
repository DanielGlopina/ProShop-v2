import dns from "dns";
import "dotenv/config";
import mongoose from "mongoose";
// import User from "./models/user-model.js";
// import { users } from "./data/users.js";
import { products } from "./data/products.js";
import Product from "./models/product-model.js";

// const seedUsers = async () => {
//   const mongoUri = process.env.MONGODB_URI;

//   dns.setServers(["8.8.8.8", "1.1.1.1"]);

//   if (!mongoUri) {
//     throw new Error("MONGODB_URI is not set in the .env file");
//   }

//   await mongoose.connect(mongoUri);

//   try {
//     await User.deleteMany({});
//     const createdUsers = await User.insertMany(users);

//     console.log(`Seeded ${createdUsers.length} users`);
//   } finally {
//     await mongoose.disconnect();
//   }
// };

const seedProducts = async () => {
  const mongoUri = process.env.MONGODB_URI;

  dns.setServers(["8.8.8.8", "1.1.1.1"]);

  if (!mongoUri) {
    throw new Error("MONGODB_URI is not set in the .env file");
  }

  await mongoose.connect(mongoUri);

  try {
    await Product.deleteMany({});
    const createProducts = await Product.insertMany(products);

    console.log(`Seeded ${createProducts.length} products`);
  } finally {
    await mongoose.disconnect();
  }
};

// seedUsers().catch((error: unknown) => {
//   console.error("Unable to seed users:", error);
//   process.exitCode = 1;
// });

seedProducts().catch((error: unknown) => {
  console.error("Unable to seed products:", error);
  process.exitCode = 1;
});
