import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    platform: { type: String, required: true }, // youtube | instagram | tiktok

    title: String,
    views: Number,
    likes: Number,
    comments: Number,
    postedAt: Date,

  },
  { timestamps: true }
);

export default mongoose.model("Analytics", analyticsSchema);
