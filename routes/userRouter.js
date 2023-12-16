import express from "express";
import {createUser} from "../controller/user.js"
const router = express.Router();


router.get('/', (req, res) => {
        res.render('index');
}   
);


router.post('/createuser', createUser);


export { router as userRouter };
