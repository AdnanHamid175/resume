import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./db.js";
import cors from "cors";
import { notFound, errorHandler } from "./middlewares/errorMiddleWare.js";
import Profile from "./Models/profileModel.js";

dotenv.config();

// allow all origins
const corsOptions = {
  origin: "*",
  headers: "*",
  methods: "*",
};

connectDB();

const app = express();
app.use(cors(corsOptions));

app.use(express.json()); // to accept json data in the body

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/profile", async (req, res) => {
  const profiles = await Profile.find({});
  if (profiles) {
    res.status(200).json(profiles);
  } else {
    res.status(404);
    throw new Error("Profiles not found");
  }
});

app.post("/save-profile", async (req, res) => {
  const dataArray = req.body.dataArray;

  // loop through the array and save each object to the database
  for (const data of dataArray) {
    const { name, type, data: content } = data;

    if (!name || !type || !content) {
      throw new Error("Please fill all the fields");
    }

    // check if the profile already exists
    const existingProfile = await Profile.findOne({ name });

    // if exists then update the profile
    if (existingProfile) {
      const updatedProfile = await Profile.findByIdAndUpdate(
        existingProfile._id,
        {
          name,
          type,
          data: content,
        },
        { new: true }
      );

      if (updatedProfile) {
        res.status(200).json({
          _id: updatedProfile._id,
          name: updatedProfile.name,
          type: updatedProfile.type,
          data: updatedProfile.data,
        });
      } else {
        res.status(400);
        throw new Error("Profile not updated");
      }
    } else {
      // create a new profile object
      const profile = await Profile.create({
        name,
        type,
        data: content,
      });

      if (profile) {
        res.status(201).json({
          _id: profile._id,
          name: profile.name,
          type: profile.type,
          data: profile.data,
        });
      } else {
        res.status(400);
        throw new Error("Profile not created");
      }
    }
  }
});

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
