import * as repo from "#infra/repository/projects/index";
import { validateAccessPermission } from "../validacao/permissionValidation.js";

export async function queryUserProjectsService(userId) {
  let projects = await repo.queryProjects.queryUserProjects(userId);
  
  for(let project of projects) {
    project.permission = await validateAccessPermission(project.id, userId);
  }

  return projects;
}

export async function queryProjectService(id, userId) {
  let project = await repo.queryProjects.getProject(id);

  let permission = await validateAccessPermission(id, userId);

  if(permission !== 'owner')
    delete project.share.link.code;

  project.permission = permission;

  return project;
}