import mysql from "mysql2";

const createConnection = () => {
  return mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "blogsite",
    port:3307,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
};

export default createConnection;



