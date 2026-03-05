import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  images: [String],
  status: {
    type: String,
    enum: ["draft", "published"]
  },
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Product", productSchema);