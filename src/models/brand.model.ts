import mongoose from "mongoose";

//! brand schema
const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "brand name is required"],
            minLength: [3, "name must be 3 char. long"],
            trim: true,
        },
        brand_logo: {
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
    },
    { timestamps: true },
);

//! creating a model
const Brand = mongoose.model("Brand", brandSchema);

export default Brand;
