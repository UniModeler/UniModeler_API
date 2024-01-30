import * as repo from "#infra/repository/projects/index";

export async function queryProjectService(userID) {
    let projects = await repo.queryProjects.queryProjects(userID);

    return projects;
}