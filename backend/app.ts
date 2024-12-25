const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const router = require("./routes");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());

app.use(cookieParser());

app.use("/api", router);

app.use(errorMiddleware);

module.exports = app;
