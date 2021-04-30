import { https } from "firebase-functions";
import proxy from "express-http-proxy";
import express from "express";

const apiHost = "https://hichain-web-apps.an.r.appspot.com/";
const app = express();

app.use("/", proxy(apiHost));
exports.apiProxy = https.onRequest(app);
