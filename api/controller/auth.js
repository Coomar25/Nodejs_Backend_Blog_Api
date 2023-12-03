import createConnection from "../config/dbConnect.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const db = createConnection();
// export const secretKey = process.env.JWT_SECRET || 'defaultSecretKey';
export const secretKey = "secretkey";

export const registerUser = async (req, res) => {
  const { username, email, password, confirmpassword, image } = req.body;

  if (!username || !email || !password || !confirmpassword) {
    return res
      .status(400)
      .send({
        error: "Seems like some fields are empty! Provide all field intel.",
      });
  }

  if (password !== confirmpassword) {
    return res
      .status(400)
      .send({ error: "Password and confirm password do not match." });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const sqlInsert =
      "INSERT INTO users(username, email, password, image) VALUES (?, ?, ?, ?)";
    db.promise()
      .execute(sqlInsert, [username, email, hashedPassword, image])
      .then(([rows]) => {
        res.status(200).json({
          message: "User has been registered successfully",
          result: rows,
        });
      })
      .catch((error) => {
        res
          .status(500)
          .send({
            error: "An error occurred while inserting the user's data.",
          });
      });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while encrypting the password." });
  }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const sqlSelect = "SELECT * FROM users WHERE email = ?";

    try {
        const [rows] = await db.promise().execute(sqlSelect, [email]);

        if (rows.length === 0) {
            throw new Error("Invalid email! Please check your email");
        }

        const hashedPasswordFromDB = rows[0].password;

        const isPasswordValid = await bcrypt.compare(password, hashedPasswordFromDB);

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        const userId = rows[0].id;
        // const username = rows[0].username;
        const { id, username, image } = rows[0];
        const token = jwt.sign({userId}, secretKey, {expiresIn: '900s'});

        res.cookie('token', token, {httpOnly:true, maxAge:90000}).status(200).json({
            message: "Login successful",
            token: token,
            user: {
              id,
              username,
              email,
              image
            }
        });


    } catch (error) {
        res.status(401).send({
            error: error.message || "An error occurred while logging in the user.",
        });
    }
};


export const logoutUser = async (req, res) => {};


export const testTokenFunction = async (req, res) => {
    res.send("THis page is accces after having authntication only");
}
