import * as repo from "#infra/repository/projects/index";
import { validateUpdate } from "../validacao/modificationsValidation.js";
import { validateEditingPermission, validateOwnerPermission, validateOwnerChange } from "../validacao/permissionValidation.js";

export async function updateProjectService(projectId, userId, newModel) {
    await validateEditingPermission(projectId, userId);

    let r = await repo.modifyProjects.updateProject(projectId, newModel);

    validateUpdate(r);

    return r;
}

export async function renameProjectService(projectId, userId, newName) {
    await validateOwnerPermission(projectId, userId);

    let r = await repo.modifyProjects.renameProject(projectId, newName);

    validateUpdate(r);

    return r;
}

export async function addImageService(projectId, userId, imagePath) {
    await validateEditingPermission(projectId, userId);

    let r = await repo.modifyProjects.addImage(projectId, imagePath);

    validateUpdate(r);

    return r;
}

export async function updateUserService(id, userId) {
    await validateOwnerChange(id, userId);

    let r = await repo.modifyProjects.updateProjectUser(id, userId);

    validateUpdate(r);

    return r;
}