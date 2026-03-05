import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  images: [
    {
      type: String
    }
  ],

  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft"
  },

  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  isDeleted: {
    type: Boolean,
    default: false
  }

},
{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;