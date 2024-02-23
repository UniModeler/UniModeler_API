import * as repo from "#infra/repository/projects/index";

export async function updateProjectService(id, projectInfo) {
    let r = await repo.modifyProjects.updateProject(id, projectInfo);

    return r;
}

export async function addImageService(projectId, imagePath) {
    let r = await repo.imageControl.addImage(projectId, imagePath);

    return r;
}

export async function updateUserService(id, userId) {
    let r = await repo.modifyProjects.updateProjectUser(id, userId);

    return r;
}

export async function updateCollaboratorService(projectId, collaboratorId, permission) {
    let r = await repo.shareControl.updateCollaborator(projectId, collaboratorId, permission);

    return r;
}

export async function updateLinkService(projectId, permission) {
    let r = await repo.shareControl.updateLink(projectId, permission);

    return r;
}