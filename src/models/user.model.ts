import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        full_name: {
            type: String,
            required: [true, "full_name is required"],
            minLength: [3, "Name must be 3 char. long"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            unique: [true, "user already exists with provided email"],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
            minLength: [6, "password must be 6 char. long"],
        },
        phone: {
            type: String,
        },
        //! role
        //! profile_image
    },
    { timestamps: true },
);

//! model
const User = mongoose.model("user", userSchema);
export default User;
