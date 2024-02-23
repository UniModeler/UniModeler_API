import * as repo from "#infra/repository/projects/index";

export async function insertProjectService(projectInfo, ipAddress) {
    let r = await repo.modifyProjects.insertProject(projectInfo, ipAddress);

    return r;
}

export async function addCollaboratorService(id, collaboratorId) {
    r = await repo.shareControl.addCollaborator(id, collaboratorId);

    return r;
}