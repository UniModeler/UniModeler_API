import { ObjectId } from "mongodb";
import { connect } from "../base/connection.js";
import { LIST_COLLABORATION_PROJECTS_PROJECTION, LIST_USER_PROJECTS_PROJECTION, PROJECT_PROJECTION } from "./projections.js";

const [collection] = connect('projects');

export async function queryUserProjects(userId) {
  let r = await collection.find({ 
    'userId': userId 
  })
  .sort({ 
    lastModified: -1 
  })
  .project(LIST_USER_PROJECTS_PROJECTION)
  .toArray();

  return r;
}

export async function queryCollaborationProjects(userId) {
  let r = await collection.find({
    'share.collaborators.userId': userId
  })
  .sort({ lastModified: -1 })
  .project(LIST_COLLABORATION_PROJECTS_PROJECTION)
  .toArray();

  return r;
}

export async function getProject(id) {
  let r = await collection.findOneAndUpdate({
    _id: new ObjectId(id)
  }, {
    $currentDate: { lastAccess: true }
  }, {
    returnDocument: 'after',
    projection: PROJECT_PROJECTION
  });

  return r;
}