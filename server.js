const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");


connectDB();

app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

const port = process.env.PORT || 5000;
app.listen(port, (err) =>
  err
    ? console.log("Error", err)
    : console.log(`the server is running on port ${port}`)
);