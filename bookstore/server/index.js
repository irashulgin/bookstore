require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes/index");
const errorMiddleware = require("./middlewares/error-middleware");
const bodyParser = require("body-parser");
const loggerMiddleware = require("./middlewares/logger-middleware");
const PORT = process.env.port || 5010;

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api", router);
app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};
start();
