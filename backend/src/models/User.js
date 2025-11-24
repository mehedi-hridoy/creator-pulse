import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 40,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String, // optional for Google-only accounts
    },
    googleId: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
