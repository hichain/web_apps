import { https } from "firebase-functions";
import proxy from "express-http-proxy";
import express from "express";
import { envs } from "../../envs";
import { exit } from "process";

const apiHost = envs?.master.url;
if (apiHost == null) {
  exit(1);
}

const app = express();

app.use("/", proxy(apiHost));
exports.apiProxy = https.onRequest(app);
