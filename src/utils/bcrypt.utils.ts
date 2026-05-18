import bcrypt from "bcryptjs";

//! hash password
export const hashPassword = async (password: string) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        return hash;
    } catch (error: any) {
        console.log(error);
        throw error;
    }
};

//! compare password
export const comparePassword = async (password: string, hash: string) => {
    try {
        return await bcrypt.compare(password, hash);
    } catch (error: any) {
        console.log(error);
        throw error;
    }
};
