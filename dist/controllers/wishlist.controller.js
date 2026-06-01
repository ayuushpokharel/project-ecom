"use strict";
// import { NextFunction, Request, Response } from "express";
// import { catchAsync } from "../utils/catchAsync.utils";
// import Wishlist from "../models/wishlist.model";
// import AppError from "../utils/appError.utils";
// import { sendResponse } from "../utils/sendResponse.utils";
// //! add/ remove from wishlist
// export const addToWishlist = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     //* get user and product from req body
//     // const user = user
//     // const { user, product } = req.body;
//     //* check if item already exists in wishlist
//     const item = await Wishlist.findOne({ user, product });
//     //* remove from wishlist
//     if (item) {
//       await Wishlist.findByIdAndDelete(item._id);
//       sendResponse(res, {
//         message: "Item removed from wishlist",
//         data: item,
//         statusCode: 200,
//       });
//     }
//     //* add to wishlist
//     if (!item) {
//       // await Wishlist.create({ user, product });
//       sendResponse(res, {
//         message: "Item added to wishlist",
//         data: item,
//         statusCode: 200,
//       });
//     }
//   },
// );
// //! get wishlist
// export const getWishlist = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     //* get user from req body
//     const { user } = req.body;
//   },
// );
// //! clear wishlist
