import mongoose from "mongoose";

const personSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Įveskite vardą ir pavardę"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Įveskite el. paštą"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: [true, "Įveskite amžių"],
      min: [1, "Amžius per mažas"],
      max: [120, "Amžius per didelis"],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

personSchema.virtual("birthYear").get(function () {
  return new Date().getFullYear() - this.age;
});

export default mongoose.model("Person", personSchema);
