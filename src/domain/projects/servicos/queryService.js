import * as repo from "#infra/repository/projects/index";
import * as shareRepo from '#infra/repository/projects-share/index'; 
import { validatePermission } from "../validacao/permissionValidation.js";

export async function queryUserProjectsService(userId) {
    let projects = await repo.queryProjects.queryUserProjects(userId);
    
    for(let project of projects) {
        project.permission = await shareRepo.collaboratorsControl.getProjectPermission(project._id, userId);
    }

    return projects;
}

export async function queryProjectService(id, userId) {
    let project = await repo.queryProjects.getProject(id);
    let permission = await shareRepo.collaboratorsControl.getProjectPermission(id, userId);

    validatePermission(permission, project);

    project.permission = permission;

    return project;
}