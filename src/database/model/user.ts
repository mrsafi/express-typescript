import mongoose, {Model} from "mongoose";

export class User {

    public UserModel: any;

    static init() {
        const user: User = new User();
        return user;
    }

    constructor() {

        // Create a new mongoose model
        const userSchema = new mongoose.Schema({
            name: {type: String},
            age:  {type: Number},
            profile : {
                role: {type: String},
                age: {type: Number}
            }
        });
        this.UserModel = mongoose.model("User", userSchema, "User");

        const pipeline = [];
        //
        // const pipeline = [
        //     { $match: { "fullDocument.name": "safi" } },
        // ];


        // const pipeline = [
        //    // { $match: { "fullDocument.name": "safi" } },
        //     {
        //         $match: {
        //             $and: [
        //                 { "updateDescription.updatedFields.name": { $eq: "safi" } },
        //                 { operationType: "update" }
        //             ]
        //         }
        //     }
        // ];
        this.UserModel.watch().on("change", (data: any) => console.log(new Date(), data));
    }


}