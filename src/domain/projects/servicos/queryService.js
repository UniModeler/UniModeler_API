import * as repo from "#infra/repository/projects/index";

export async function queryUserProjectsService(userId) {
    let projects = await repo.queryProjects.queryUserProjects(userId);

    return projects;
}

export async function queryCollaborationProjectsService(userId) {
    let projects = await repo.queryProjects.queryCollaborationProjects(userId);

    return projects;
}

export async function queryProjectService(id, userId) {
    let project = await repo.queryProjects.getProject(id, userId);
    project.permission = await repo.shareControl.getCollaboratorPermission(id, userId);

    return project;
}

export async function queryCodeService(code) {
    let project = await repo.queryProjects.getProjectByCode(code);
    project.permission = await repo.shareControl.getLinkPermission(project._id);

    return project;
}