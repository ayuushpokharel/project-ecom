"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//! category schema =>  name:req , description: op
const categorySchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
//! model
const Category = mongoose_1.default.model("Category", categorySchema);
exports.default = Category;
