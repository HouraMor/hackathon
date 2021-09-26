import { Role } from "./users.role.enum";

export interface User extends Document {
    email: string,
    roles: Role[];
}