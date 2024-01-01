import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { userRouter } from "./routes/userRouter.js";
import { authRouter } from "./routes/authRouter.js";
import { postRouter } from "./routes/postRouter.js";
import createConnection from "./config/dbConnect.js";
import { connectToMongoDb } from "./config/mongodbConnect.js";
import cors from "cors";
import { adminRouter } from "./routes/adminRouter.js";

const app = express();
const PORT = process.env.PORT || 4000;
dotenv.config();

app.listen(PORT, () => {
  console.log(`server is listening on port http://localhost:${PORT}`);
});

// Add this middleware to enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_URL);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CORS_URL }));

// Create a connection pool
const db = createConnection();
// creating a connection pool for mango db
(async () => {
  const connection = await connectToMongoDb();
})();

// Check the database connection status
db.promise()
  .getConnection()
  .then((connection) => {
    console.log("Connected to the database!");
    connection.release(); // Release the connection back to the pool
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error.message);
  });

app.use("/", userRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/admin", adminRouter);

// Ejs
app.set("view engine", "ejs");
app.use("/public", express.static("public"));
