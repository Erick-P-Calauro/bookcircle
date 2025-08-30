import { routes } from "./routes";
import { config } from "dotenv"

const express = require("express");
const app = express();
config()

const PORT = process.env.APP_PORT;

app.use(routes);

app.listen(PORT, (req, res) => {
    console.log("Starting application ...")
    console.log("localhost:"+PORT);
})