import * as repo from "#infra/repository/projects-share/index";

export async function deleteCollaboratorService(projectId, collaboratorId) {
    let r = await repo.collaboratorsControl.deleteCollaborator(projectId, collaboratorId);

    return r;
}