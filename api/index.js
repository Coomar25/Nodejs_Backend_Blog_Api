import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { userRouter } from "./routes/userRouter.js";
import { authRouter } from './routes/authRouter.js';
import  createConnection  from "./config/dbConnect.js";

const app = express();
const PORT = process.env.PORT || 4000;
dotenv.config();

app.listen(PORT, () => {
  console.log(`server is listening on port http://localhost:${PORT}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Create a connection pool
const db = createConnection();

// Check the database connection status
db.promise()
  .getConnection()
  .then((connection) => {
    console.log('Connected to the database!');
    connection.release(); // Release the connection back to the pool
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);
  });



app.use("/", userRouter);
app.use('/auth', authRouter);








