import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
});

export const ImageModel = mongoose.model("Image", imageSchema);
