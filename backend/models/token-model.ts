import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;
