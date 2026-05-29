import mongoose from "mongoose";

//! wishlist schema
const wishlistSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "User is required"],
    },
  },
  { timestamps: true },
);

//! wishlist model
const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
