import mongoose from "mongoose";

const orderProductSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products: [orderProductSchema],
    totalPrice: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["Placed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Placed"
    },
    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      postalCode: String,
      country: String,
      phone: String
    },
    paymentMethod: { type: String, default: "Cash on Delivery" }
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
