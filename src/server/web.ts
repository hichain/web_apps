import express from "express";
import path from "path";
import { exit } from "process";
import { envs } from "../envs";
import cors, { CorsOptions } from "cors";

if (!envs) {
  exit(1);
}

const app = express();

const frontEndAppBuildPath = path.resolve("./build");
const port = envs.web.port;
const url = envs.master.url;

const corsOptions: CorsOptions = {
  origin: url,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.static(frontEndAppBuildPath));
app.get("/*", (_, res) => {
  res.sendFile(path.join(frontEndAppBuildPath, "index.html"));
});

app.listen(port);
