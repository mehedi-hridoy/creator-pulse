import mongoose from "mongoose";

const analyticsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    platform: { type: String, required: true }, // youtube, instagram, facebook, etc.

    metrics: {
      totalViews: Number,
      totalLikes: Number,
      totalComments: Number,
      totalShares: Number,
      totalPosts: Number,

      // You can extend later (CTR, engagement rate, reach, etc.)
    },

    rawItems: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("Analytics", analyticsSchema);
