import { ObjectId } from "mongodb";
import { connect } from "../base/connection.js";

const [collection] = connect('projects');

export async function queryAllProjects(userId) {
    let r = await collection.find({
        $or : [
            {userId: userId},
            {'collaborators.userId': userId}
        ]   
    }).sort({lastModified: -1}).toArray();

    return r;
}

export async function queryProject(id, userId) {
    let r = await collection.findOneAndUpdate({
        _id: new ObjectId(id),
        $or: [
            {userId: userId},
            {"collaborators.userId": userId}
        ]
    }, {
        $currentDate: {lastAccess: true}
    }, {
        returnDocument: 'after'
    });

    return r;
}

export async function getProjectByCode(code) {
    let r = await collection.findOne({
        "share.code": code
    });

    return r;
}