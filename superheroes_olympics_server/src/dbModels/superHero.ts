import mongoose, { Schema } from "mongoose";

const attributeSubSchema = {
  type: Number,
  min: 0,
  max: 10,
  default: 0,
  required: true,
};
const superHeroSchema = new Schema({
  name: { type: String, required: true, unique: true },
  skills: {
    agility: attributeSubSchema,
    strength: attributeSubSchema,
    weight: attributeSubSchema,
    endurance: attributeSubSchema,
    charisma: attributeSubSchema,
  },
  avatar: { type: String },
  score: { type: Number, default: 0 },
});

export const SuperHeroModel = mongoose.model("SuperHero", superHeroSchema);
