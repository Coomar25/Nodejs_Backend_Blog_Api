import express from "express";
import {createUser, verifyUserThroughMail} from "../controller/user.js"

const router = express.Router();


router.get('/', (req, res) => {
        res.render('index');
}   
);


router.post('/createuser', createUser);
router.get('/emailverification/:id', verifyUserThroughMail);


export { router as userRouter };
