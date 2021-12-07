const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middlewares/error");
const routes = require("./routes");

const app: any = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api", routes);

app.use(errorMiddleware);

module.exports = app;
