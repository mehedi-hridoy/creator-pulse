import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const analyticsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  platform: { type: String, required: true },
  postedAt: { type: Date },
  metrics: {
    totalViews: Number,
    totalLikes: Number,
    totalComments: Number,
    totalShares: Number,
    totalPosts: Number,
  },
  rawItems: {
    type: Array,
    default: []
  }
}, { timestamps: true });

const Analytics = mongoose.model("Analytics", analyticsSchema);

async function checkData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const count = await Analytics.countDocuments();
    console.log(`📊 Total Analytics Documents: ${count}`);

    const allData = await Analytics.find().limit(5);
    console.log("\n📋 Sample Data:");
    console.log(JSON.stringify(allData, null, 2));

    await mongoose.connection.close();
    console.log("\n✅ Connection closed");
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

checkData();
