import * as repo from "#infra/repository/projects/index";

export async function insertProjectService(projectInfo) {
    let r = await repo.modifyProjects.insertProject(projectInfo);

    return r;
}