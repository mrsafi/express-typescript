import path from "path";

const CLIENT_PATH = path.join(__dirname, "public");
import {MONGODB_URI} from "../util/secrets";
import bluebird from "bluebird";
import mongoose from "mongoose";
import {User} from "./model/user";

export class Mongodb {

    static setup(): void {
        const mongoUrl = MONGODB_URI;
        mongoose.Promise = bluebird;

        mongoose.connect(mongoUrl, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
            .then(async (client) => {
                    console.log("MongoDB is connected.");
                    const taskCollection = mongoose.connection.collection("User");
                    const filter = [{
                        $match: {
                            $and:[
                                {"fullDocument.profile.role": "admin"},
                                {"fullDocument.profile.age": {$lte: 30}}
                            ]
                    }}];

                    const options: any = {fullDocument: "updateLookup"};

                    const changeStream = taskCollection.watch(filter, options);

                    changeStream.on("change", (change: any) => {
                        console.log(change);
                    });
                    // User.init();


                },
            ).catch(err => {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
            process.exit();
        });

    }
}
