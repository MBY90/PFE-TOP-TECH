const mongoose = require("mongoose");
const config = require("config");

const connectDB = () => {
  mongoose
    .connect(config.get("MONGOURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => console.log("mongoose is connected "))
    .catch(() => console.log("Error"));
};
module.exports = connectDB;