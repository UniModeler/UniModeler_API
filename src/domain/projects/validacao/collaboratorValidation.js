import * as projectRepo from "#infra/repository/projects/index";

export async function validateCollaborator(projectId, collaboratorId) {
    let project = await projectRepo.queryProjects.getProject(projectId);

    if (project.userId === collaboratorId) {
        throw new UniModelerError('Owner of the project');
    }

    for (let collaborator of project.share.collaborators) {
        if(collaborator.userId === collaboratorId) 
            throw new UniModelerError('Already invited');
    }
}