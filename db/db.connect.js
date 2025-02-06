const mongoose = require("mongoose");

require("dotenv").config();

const mongoURI = process.env.MONGODB;

const initialiseDatabase = async () => {
  await mongoose
    .connect(mongoURI)
    .then(() => {
      console.log("CONNECTED TO THE DATABASE");
    })
    .catch(() =>
      console.error("EEROR WHILE CONNECTING TO THE DATABASE", error)
    );
};

module.exports = { initialiseDatabase };