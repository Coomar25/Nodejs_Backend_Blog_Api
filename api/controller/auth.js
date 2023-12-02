import createConnection from "../config/dbConnect.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const db = createConnection();
export const registerUser = async (req, res) => {
    const { username, email, password, confirmpassword } = req.body;

    if (!username || !email || !password || !confirmpassword) {
        return res.status(400).send({ error: "Seems like some fields are empty! Provide all field intel." });
    }

    if (password !== confirmpassword) {
        return res.status(400).send({ error: "Password and confirm password do not match." });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sqlInsert = "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";
        db.promise()
            .execute(sqlInsert, [username, email, hashedPassword])
            .then(([rows]) => {
                res.status(200).json({
                    message: "User has been registered successfully",
                    result: rows
                });
            })
            .catch((error) => {
                res.status(500).send({ error: "An error occurred while inserting the user's data." });
            });
    } catch (error) {
        res.status(500).send({ error: "An error occurred while encrypting the password." });
    }
};


export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const sqlSelect = "SELECT * FROM user WHERE username = ? AND password = ?";
    try {
        const [rows] = await db.promise().execute(sqlSelect, [username, password]);
        if (rows.length === 0) {
            throw new Error("Invalid username or password.");
        }
        jwt.sign({ username }, secretKey, { expiresIn: '900s' }, (error, token) => {
            if (error) {
                throw new Error("Failed in token generation");
            }
            res.status(200).send({ message: "Login successful.", token });
        });
    } catch (error) {
        res.status(401).send({ error: "Exception Occcured" });
    }
};



export const logoutUser = async (req, res) => {


}
