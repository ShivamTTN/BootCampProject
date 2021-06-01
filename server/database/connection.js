const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", (err, res) => {
  console.log("Connected To Mongoose");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongoose " + err);
});

module.exports = { mongoose };
