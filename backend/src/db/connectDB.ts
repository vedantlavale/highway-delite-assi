import mongoose from "mongoose";
import { Experience } from "../models/experience";
import { seedData } from "../seed/seed";


async function connectDB() {
    await mongoose.connect(process.env.MONGO_URI || "")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });
}

async function seedDB(): Promise<{ success: boolean; message: string; count?: number; error?: string }> {
  return await seedData();
}

export default connectDB;
export { seedDB };

if (import.meta.main) {
  async function runSeed() {
    try {
      console.log('Connecting to database...');
      await connectDB();
      console.log('Connected to database');

      console.log('Starting database seeding...');
      const result = await seedDB();

      if (result.success) {
        console.log(`${result.message}`);
        if (result.count) {
          console.log(`Seeded ${result.count} experiences`);
        }
      } else {
        console.error('Seeding failed:', result.error);
      }

    } catch (error) {
      console.error('Error:', error);
    } finally {
      await mongoose.connection.close();
      console.log('Database connection closed');
    }
  }

  runSeed();
}
