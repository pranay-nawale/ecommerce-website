import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: "text" },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, index: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    images: [{ type: String, required: true }],
    rating: { type: Number, min: 0, max: 5, default: 0 },
    isFeatured: { type: Boolean, default: false }
  },
  { timestamps: true }
);

productSchema.index({ title: "text", description: "text", category: "text" });

export default mongoose.model("Product", productSchema);
