import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config();

const port = process.env.PORT || 3000;
const root = path.join(__dirname, "..", "..", "build");

express()
  .use(express.static(root))
  .get("/*", (_, res) => res.sendFile(path.join(root, "index.html")))
  .listen(port, () => console.log(`Listening on ${port}`));
