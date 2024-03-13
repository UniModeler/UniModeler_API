import * as repo from "#infra/repository/projects/index";
import { validateAccessPermission } from "../validacao/permissionValidation.js";

export async function insertProjectService(projectInfo, ipAddress) {
    let r = await repo.modifyProjects.insertProject(projectInfo, ipAddress);

    return r;
}

export async function duplicateProjectService(projectId, userId, ipAddress) {
    await validateAccessPermission(projectId, userId);

    let project =  await repo.queryProjects.getProject(projectId);

    let projectInfo = {
        userId: project.userId,
        name: project.info.name + ' Copy',
        cover: project.info.cover,
        jsContent: project.modeling.data
    }

    let r = await repo.modifyProjects.insertProject(projectInfo, ipAddress);

    return r;
}