import * as repo from "#infra/repository/projects/index";
    import * as shareRepo from '#infra/repository/projects-share/index'; 
import { validatePermission } from "../validacao/permissionValidation.js";

export async function queryUserProjectsService(userId) {
    let projects = await repo.queryProjects.queryUserProjects(userId);

    return projects;
}

export async function queryProjectService(id, userId) {
    let project = await repo.queryProjects.getProject(id);
    let permission = await shareRepo.collaboratorsControl.getCollaboratorPermission(id, userId);

    validatePermission(permission, project);

    project.permission = permission;

    return project;
}