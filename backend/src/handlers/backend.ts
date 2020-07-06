import cors from "cors";
import express from "express";
import serverless from "serverless-http";
import APIRouter from "../api/api";
const morgan = require("morgan");
// Register global express configs such as middleware that applies to all routes
const app = express();
app.use(morgan("combined"));
app.use(express.json());
app.use(cors());

app.use(`/api`, APIRouter);
app.get("*", (req, res) =>
  res.status(404).send(":(  Requested route was not found!")
);

module.exports.api = serverless(app);
