import * as repo from "#infra/repository/projects/index";

export async function queryAllProjectsService(userID) {
    let projects = await repo.queryProjects.queryAllProjects(userID);

    return projects;
}

export async function queryProjectService(id) {
    let projects = await repo.queryProjects.queryProject(id);

    return projects;
}