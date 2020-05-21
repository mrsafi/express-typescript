import express from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";

const CLIENT_PATH = path.join(__dirname, "public");
import {AppRoutes} from "./route";
import {PORT} from "./util/secrets";
import {Mongodb} from "./database/mongodb";


class App {
    public app: express.Application = express();

    constructor() {
        Mongodb.setup();
        this.config();
    }

    private config(): void {
        // Express configuration
        this.app.set("port", PORT);
        this.app.set("CLIENT_PATH", CLIENT_PATH);
        this.app.set("ROOT_DIR", path.join(__dirname));
        this.app.use(bodyParser.json({limit: "50mb"}));
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(cors());
        this.app.use(express.static(CLIENT_PATH));
        AppRoutes.routes(this.app);
    }


}

export default new App().app;
