import { ObjectId } from "mongodb";
import { connect } from "../base/connection.js";

const [collection] = connect('projects');

export async function queryAllProjects(userId) {
    let r = await collection.find({
        userId: userId
    }).toArray();

    return r;
}

export async function queryProject(id) {
    let r = await collection.findOneAndUpdate({
        _id: new ObjectId(id)
    }, {
        $currentDate: {lastAccess: true}
    }, {
        returnDocument: 'after'
    });

    return r;
}