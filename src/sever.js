import express from "express";
import bodyParser from "body-parser";
import ViewEngine from "./confix/ViewEngine";
import initWebRouter from "./router/web";
import connectDB from "./config/connectDB";

require('dotenv').config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

ViewEngine(app);
initWebRouter(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port)
})