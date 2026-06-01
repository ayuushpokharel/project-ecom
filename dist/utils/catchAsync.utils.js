"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsync = void 0;
const catchAsync = (fn) => {
    return async (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
        // try{
        //     await fn(req,res,next);
        // }catch(error){
        //     next(error)
        // }
    };
};
exports.catchAsync = catchAsync;
