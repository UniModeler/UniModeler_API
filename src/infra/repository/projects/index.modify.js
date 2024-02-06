import { ObjectId } from "mongodb";
import { connect } from "../base/connection.js";
import { generateIDFromTime } from "../../../util/generateID.js";

const [collection] = connect('projects');

export async function insertProject(projectInfo, ipAddress) {

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
        share: {
            code: generateIDFromTime(), // o código serve pra mandar uma cópia editável do projeto (/sharedLink/:code)
            collaborators: [] // se você for um dos colaboradores, poderá acessar o projeto diretamente (/projects/:id)
        },
        ipAddress: ipAddress,
        lastAccess: currentTime,
        lastModified: currentTime,
        ts: currentTime
    })

    if(r.acknowledged) {
        return await collection.findOne({_id: new ObjectId(r.insertedId)});
    }

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

export async function updateProjectUser(id, userId) {
    let r = await collection.updateOne({
        _id: new ObjectId(id)
    }, {
        $set: {userId: userId}
    });

    return r;
}

export async function updateCollaborator(id, collaboratorId, permission) {
    let r = await collection.updateOne({
        _id: new ObjectId(id),
        "collaborators.userId": collaboratorId
    }, {
        $set: {"collaborators.$.permission": permission}
    })

    return r;
}

export async function addCollaborator(id, collaboratorId, permission) {
    let r = await collection.updateOne({
        _id: new ObjectId(id)
    }, {
        $push: {"share.collaborators": {userId: collaboratorId, permission: permission}}
    })

    return r;
}