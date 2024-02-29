import * as repo from "#infra/repository/projects-share/index";
import { validateCollaborator } from "../validacao/collaboratorValidation.js";

export async function addCollaboratorService(projectId, collaboratorId) {
    await validateCollaborator(projectId, collaboratorId);

    let r = await repo.collaboratorsControl.addCollaborator(projectId, collaboratorId);

    return r;
}