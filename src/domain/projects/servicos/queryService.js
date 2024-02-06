import * as repo from "#infra/repository/projects/index";

export async function queryAllProjectsService(userId) {
    let projects = await repo.queryProjects.queryAllProjects(userId);

    return projects;
}

export async function queryProjectService(id, userId) {
    let project = await repo.queryProjects.queryProject(id, userId);

    return project;
}

export async function queryCodeService(code) {
    let project = await repo.queryProjects.getProjectByCode(code);

    return project;
}