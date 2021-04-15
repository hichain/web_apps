import express from "express";
import path from "path";
import { envs } from "../envs";

const app = express();

const frontEndAppBuildPath = path.resolve("./build");
const port = envs?.web.port;

app.use(express.static(frontEndAppBuildPath));
app.listen(port);
