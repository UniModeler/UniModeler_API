import { ObjectId } from "mongodb";
import { connect } from "../base/connection.js";

const [collection] = connect('projects');

export async function insertProject(projectInfo) {

    let currentTime = new Date().toISOString();

    let r = await collection.insertOne({
        userId: projectInfo.userId,
        info: {
            name: projectInfo.name,
            cover: projectInfo.cover
        },
        modeling: {
            data: projectInfo.jsContent
        },
        lastAccess: currentTime,
        lastModified: currentTime,
        ts: currentTime
    })

    return r;
}

export async function updateProject(id, projectInfo) {
    let r = await collection.updateOne({
        _id: new ObjectId(id)
    }, {
        $set: {
            "info.name": projectInfo.info.name,
            "modeling.data": projectInfo.modeling.data
        },
        $currentDate: {lastModified: true}
    })

    return r;
}

export async function deleteProject(id) {
    let r = await collection.deleteOne({
        _id: new ObjectId(id)
    });

    return r;
}