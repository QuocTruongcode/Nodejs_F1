import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();

let initWebRouter = (app) => {

    router.get('/', homeController.getHomePage);

    router.get('/abc', homeController.getAbout);

    return app.use("/", router);
}

module.exports = initWebRouter;