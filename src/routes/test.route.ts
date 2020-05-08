import {Request, Response, Router} from "express";

export class TestRoute {

    static routes(): Router {

        return Router()
            .get("/", (req, res) => res.json({"message": "test route"}));

    }
}