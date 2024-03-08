import { ObjectId } from "mongodb";
import { connect } from "../base/connection.js";

const [collection] = connect('projects');

export async function getProjectPermission(projectId, userId) {
    let r = await collection.findOne(
        {
            _id: new ObjectId(projectId),
            $or: [
                { userId: userId },
                { "share.collaborators.userId": userId }
            ]
        });

    if (!r)
        return 'guest';
    else if (r.userId === userId)
        return 'owner'
    else {
        // return r.share.collaborators.find(x => x.userId === userId)?.permission;
        for (let collaborator of r.share.collaborators)
            if (collaborator.userId === userId)
                return collaborator.permission;
    }
}

export async function updateCollaborator(projectId, collaboratorId, permission) {

    let r = await collection.updateOne({
        _id: new ObjectId(projectId),
        "share.collaborators.userId": collaboratorId
    }, {
        $set: { "share.collaborators.$.permission": permission }
    })

    return r;
}

export async function deleteCollaborator(projectId, collaboratorId) {
    let r = await collection.updateOne({
        _id: new ObjectId(projectId),
    }, {
        $pull: {"share.collaborators.userId": collaboratorId}
    })

    return r;
}

export async function addCollaborator(projectId, collaboratorId) {

    let r = await collection.updateOne({
        _id: new ObjectId(projectId)
    }, {
        $push: { 
            "share.collaborators": { 
                userId: collaboratorId, 
                permission: 'read',
                accepted: false 
            } 
        }
    })

    return r;
}