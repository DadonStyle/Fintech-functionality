const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use("/", routes);

app.listen(process.env.port, () =>
  console.log("up and running")
);
