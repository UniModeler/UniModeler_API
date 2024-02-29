import * as repo from "#infra/repository/projects/index";

export async function deleteProjectService(id) {
    let r = await repo.modifyProjects.deleteProject(id);

    return r;
}