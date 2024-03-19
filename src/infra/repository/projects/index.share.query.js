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
    return r.share.collaborators.find(
      collaborator => collaborator.userId === userId
    ).permission; 
  }
}

export async function getLinkPermission(projectId) {
  let r = await collection.findOne({
    _id: new ObjectId(projectId)
  });

  return r.share.link.permission;
}

export async function getProjectByCode(code) {
  let r = await collection.findOne({
    "share.link.code": code
  });
  return r;
}
