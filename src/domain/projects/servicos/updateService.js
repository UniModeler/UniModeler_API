import * as repo from "#infra/repository/projects/index";

export async function updateProjectService(id, projectInfo) {
    let r = await repo.modifyProjects.updateProject(id, projectInfo);

    return r;
}