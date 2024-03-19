import * as repo from "#infra/repository/projects/index";
import { validateDeletion } from "../validacao/modificationsValidation.js";
import { validateOwnerPermission } from "../validacao/permissionValidation.js";

export async function deleteProjectService(projectId, userId) {
  await validateOwnerPermission(projectId, userId);

  let r = await repo.modifyProjects.deleteProject(projectId);

  validateDeletion(r);

  return r;
}