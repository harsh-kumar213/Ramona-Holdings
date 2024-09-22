import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema({
  suggestedBy: { type: String, required: true },
  suggestedAt: { type: Date, default: Date.now },
  suggestionText: { type: String, required: true },
  status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending" },
});

const ideaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    image: {type:String},
    suggestions: [suggestionSchema],
  },
  { timestamps: true }
);

const Idea = mongoose.model("Idea", ideaSchema);

export default Idea;
