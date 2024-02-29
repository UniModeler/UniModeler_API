import { ObjectId } from "mongodb";
import { connect } from "../base/connection.js";

const [collection] = connect('projects');


// share links

export async function getLinkPermission(projectId) {
    let r = await collection.findOne({
        _id: new ObjectId(projectId)
    });

    return r.share.link.permission;
}

export async function updateLink(projectId, permission) {
    let r = await collection.updateOne({
        _id: new ObjectId(projectId)
    }, {
        $set: { "share.link.permission": permission }
    });

    return r;
}