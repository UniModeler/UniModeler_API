import * as repo from "#infra/repository/projects/index";
import { validateUpdate } from "../../validacao/modificationsValidation.js";
import { validateOwnerPermission } from "../../validacao/permissionValidation.js";

export async function deleteCollaboratorService(projectId, userId, collaboratorId) {
    await validateOwnerPermission(projectId, userId);

    let r = await repo.modifySharing.deleteCollaborator(projectId, collaboratorId);

    validateUpdate(r);

    return r;
}