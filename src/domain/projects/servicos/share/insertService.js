import * as repo from "#infra/repository/projects/index";
import { validateCollaborator } from "../../validacao/collaboratorValidation.js";
import { validateOwnerPermission } from "../../validacao/permissionValidation.js";

export async function addCollaboratorService(projectId, userId, collaboratorId) {
    await validateOwnerPermission(projectId, userId);
    await validateCollaborator(projectId, collaboratorId);

    let r = await repo.modifySharing.addCollaborator(projectId, collaboratorId);

    return r;
}