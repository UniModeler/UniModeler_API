import * as repo from "#infra/repository/projects/index";
import { validateAccessPermission } from "../../validacao/permissionValidation.js";

export async function queryCollaborationProjectsService(userId) {
  let projects = await repo.queryProjects.queryCollaborationProjects(userId);

  for(let project of projects) {
    project.permission = await validateAccessPermission(project.id, userId);
  }

  return projects;
}

export async function queryCodeService(code) {
  let project = await repo.querySharing.getProjectByCode(code);
  project.permission = await repo.querySharing.getLinkPermission(project.id);

  return project;
}