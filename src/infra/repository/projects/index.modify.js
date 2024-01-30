import { ObjectId } from "mongodb";
import { connect } from "../base/connection.js";

const [collection] = connect('projects');

export async function insertProject(projectInfo) {
    let r = await collection.insertOne({
        userId: projectInfo.userId,
        info: {
            name: projectInfo.name,
            cover: projectInfo.coverImage
        },
        modeling: {
            data: projectInfo.jsContent
        },
        lastAccess: new Date().toISOString(),
        ts: new Date().toISOString()
    })

    return r;
}

export async function updateProject(id, projectInfo) {
    let r = await collection.updateOne({
        _id: new ObjectId(id)
    }, {
        $set: {
            "info.name": projectInfo.name,
            "info.cover": projectInfo.cover,
            "modeling.data": projectInfo.jsContent
        },
        $currentDate: {lastAccess: true}
    })
}

export async function deleteProject(id) {
    let r = await collection.deleteOne({
        _id: new ObjectId(id)
    });

    return r;
}