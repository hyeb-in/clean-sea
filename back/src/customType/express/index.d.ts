import { UserSchema } from "../../db/schemas/userSchema";

declare global {
    namespace Express {
        interface Request {
            currentUserId? : UserSchema[];
        }
    }
}