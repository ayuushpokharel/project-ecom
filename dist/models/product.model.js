"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: [true, "category is required"],
        ref: "Category",
    },
    //! brand
    brand: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, { timestamps: true });
//! model
const Product = mongoose_1.default.model("Product", productSchema);
exports.default = Product;
