import express from "express";
import bodyParser from "body-parser";
import ViewEngine from "./confix/ViewEngine";
import initWebRouter from "./router/web";
import connectDB from "./config/connectDB";
import cors from "cors";


require('dotenv').config();

let app = express();
app.use(cors({
    origin: "http://localhost:3000", // domain của frontend React
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // nếu bạn muốn gửi cookie hoặc token
}));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

ViewEngine(app);
initWebRouter(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port)
})