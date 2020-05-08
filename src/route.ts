import express from "express";
import {TestRoute} from "./routes/test.route";


export class AppRoutes {

    static routes(app: express.Application) {


        app.use("/test", TestRoute.routes());
        app.use("/", (req, res) => res.send("Hello Node Js"));


        // All undefined asset or api routes should return a 404
        // Basic 404 handler
        app.use((req, res) => {
            res.status(404).send(" Not Found");
        });

        app.use((err: Error & { status: number }, request: express.Request, response: express.Response, next: express.NextFunction): void => {

            response.status(err.status || 500);
            response.json({
                error: "Server error"
            });
        });


    }


}

