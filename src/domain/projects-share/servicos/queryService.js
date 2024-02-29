import * as repo from "#infra/repository/projects/index";
import * as shareRepo from '#infra/repository/projects-share/index'; 

export async function queryCollaborationProjectsService(userId) {
    let projects = await repo.queryProjects.queryCollaborationProjects(userId);

    return projects;
}

export async function queryCodeService(code) {
    let project = await repo.queryProjects.getProjectByCode(code);
    project.permission = await shareRepo.linksControl.getLinkPermission(project._id);

    return project;
}