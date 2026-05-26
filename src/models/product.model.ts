import mongooose from "mongoose";

const productSchema = new mongooose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      minLength: [3, "name must be 3 char. long"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
      minLength: [25, "description must be 25 char. long"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "price is required"],
      min: [0, "price must be a positive number"],
    },
    stock: {
      type: Number,
      required: [true, "stock is required"],
      min: [0, "stock must be a positive number"],
    },
    cover_image: {
      type: {
        path: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
      required: [true, "cover image is required"],
    },
    images: [
      {
        type: {
          path: {
            type: String,
            required: true,
          },
          public_id: {
            type: String,
            required: true,
          },
        },
      },
    ],
    //! category: id
    category: {
      type: mongooose.Schema.Types.ObjectId,
      required: [true, "category is required"],
      ref: "Category",
    },

    //! brand
    brand: {
      type: mongooose.Schema.Types.ObjectId,
      required: [true, "brand is required"],
      ref: "Brand",
    },
    new_arrival: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

//! model
const Product = mongooose.model("Product", productSchema);
export default Product;
