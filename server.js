// Importing modules
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

const PORT = process.env.PORT || 3002

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Connecting to MongoDB using Mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

// Using routes
app.use(require("./routes/index.js"));
// app.use(require("./routes/app.js"));
// app.use(require("./routes/htmlRoutes.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
