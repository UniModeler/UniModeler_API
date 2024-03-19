import * as repo from "#infra/repository/projects/index";
import { validateUpdate } from "../../validacao/modificationsValidation.js";
import { validateOwnerPermission } from "../../validacao/permissionValidation.js";

export async function updateCollaboratorService(projectId, userId, collaboratorId, permission) {
  await validateOwnerPermission(projectId, userId);

  let r = await repo.modifySharing.updateCollaborator(projectId, collaboratorId, permission);

  validateUpdate(r);

  return r;
}

export async function updateLinkService(projectId, userId, permission) {
  await validateOwnerPermission(projectId, userId);

  let r = await repo.modifySharing.updateLink(projectId, permission);

  validateUpdate(r);

  return r;
}