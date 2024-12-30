import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "User name is required"],
    },
    otherNames: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "User email is required"],
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    roles: {
      type: Array,
      required: true,
    },
    activeRole: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", schema);
