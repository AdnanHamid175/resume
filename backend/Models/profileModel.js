import { Schema, model } from "mongoose";

const profileModel = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: ["text", "json"],
      default: "text",
    },
    data: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = model("profile", profileModel);

export default Profile;
