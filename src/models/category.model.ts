import mongoose from "mongoose";

interface ICategorySchema extends Document {
    name: string;
    description?: string;
    category_image: {
        path: string;
        public_id: string;
    };
}

//! category schema =>  name:req , description: op
const categorySchema = new mongoose.Schema<ICategorySchema>(
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
        category_image: {
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

//! model
const Category = mongoose.model("Category", categorySchema);
export default Category;
