import * as repo from "#infra/repository/projects-share/index";

export async function updateCollaboratorService(projectId, collaboratorId, permission) {
    let r = await repo.collaboratorsControl.updateCollaborator(projectId, collaboratorId, permission);

    return r;
}

export async function updateLinkService(projectId, permission) {
    let r = await repo.linksControl.updateLink(projectId, permission);

    return r;
}