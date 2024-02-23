import { ObjectId } from "mongodb";
import { connect } from "../base/connection.js";

const [collection] = connect('projects');

export async function queryUserProjects(userId) {
    let r = await collection.find(
        { userId: userId }
    ).sort({ lastModified: -1 }).toArray();

    return r;
}

export async function queryCollaborationProjects(userId) {
    let r = await collection.find(
        {'share.collaborators.userId': userId}
    ).sort({lastModified: -1}).toArray();

    return r;
}

export async function getProject(id, userId) {
    let r = await collection.findOneAndUpdate({
        _id: new ObjectId(id),
        $or: [
            { userId: userId },
            { "share.collaborators.userId": userId }
        ]
    }, {
        $currentDate: { lastAccess: true }
    }, {
        returnDocument: 'after'
    });

    return r;
}

export async function getProjectByCode(code) {
    let r = await collection.findOne({
        "share.link.code": code
    });

    return r;
}