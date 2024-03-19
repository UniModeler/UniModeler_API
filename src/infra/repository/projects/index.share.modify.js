import { ObjectId } from "mongodb";
import { connect } from "../base/connection.js";

const [collection] = connect('projects');


// share links

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

export async function updateLink(projectId, permission) {
  let r = await collection.updateOne({
    _id: new ObjectId(projectId)
  }, {
    $set: { "share.link.permission": permission }
  });

  return r;
}