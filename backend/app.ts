const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const errorHandlerMw = require("./middlewares/errorHandler");
const router = require("./routes");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());

app.use(cookieParser());

app.use("/api", router);

app.use(errorHandlerMw);

module.exports = app;
