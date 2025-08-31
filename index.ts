import { initDb } from "./configuration/DatabaseConfiguration";
import { routes } from "./routes";
import { config } from "dotenv"

const express = require("express");
const app = express();
const PORT = process.env.APP_PORT;

config()
initDb();

app.use(express.json());
app.use(express.urlencoded());
app.use(routes);

app.listen(PORT, (req, res) => {
    console.log("Starting at localhost:"+PORT+" ...")
})