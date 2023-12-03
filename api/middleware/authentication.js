import jwt from 'jsonwebtoken'
import { secretKey } from '../controller/auth.js'

export const authenticateToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader != 'undefined') {
        const generatedToken = bearerHeader.split(" ");
        const token = generatedToken[1];
        req.token = token;
        jwt.verify(req.token, secretKey, (error) => {
            if (error) {
                res.send({ message: 'token not match' });
            } else {
                next();
            }
        })
    } else {
        res.send({
            message: "TOken is not valid"
        })
    }
}