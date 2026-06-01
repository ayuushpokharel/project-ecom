"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
//! wishlist schema
const wishlistSchema = new mongoose_1.default.Schema({
    product: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Product is required"],
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User is required"],
    },
}, { timestamps: true });
//! wishlist model
const Wishlist = mongoose_1.default.model("Wishlist", wishlistSchema);
exports.default = Wishlist;
