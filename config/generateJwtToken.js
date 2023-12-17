import jwt from "jsonwebtoken"

export const createJwtToken  = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "2d"});
}