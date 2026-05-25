export enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
    SUPER_ADMIN = "SUPER_ADMIN",
}

export const All_Users = Object.values(Role);
export const Only_Admins = [Role.ADMIN, Role.SUPER_ADMIN];
export const Only_Users = [Role.USER];
