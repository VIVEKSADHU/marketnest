import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["brand", "customer"]
  }
});

export default mongoose.model("User", userSchema);