import mongoose from "mongoose";

//! category schema =>  name:req , description: op
const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "name is required"],
            minlength: [3, "name must be 3 char. long"],
            trim: true,
        },
        description: {
            type: String,
            minLength: [3, "des. must be 3 char. long"],
            trim: true,
        },
    },
    { timestamps: true },
);

//! model
const Category = mongoose.model("Category", categorySchema);
export default Category;
