"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//! brand schema
const brandSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
//! creating a model
const Brand = mongoose_1.default.model("Brand", brandSchema);
exports.default = Brand;
