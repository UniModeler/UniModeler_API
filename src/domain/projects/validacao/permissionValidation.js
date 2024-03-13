import * as repo from "#infra/repository/projects/index";

export async function validateAccessPermission(projectId, userId) {
    let project = await repo.queryProjects.getProject(projectId);
    let permission = await repo.querySharing.getProjectPermission(projectId, userId);

    if (permission === 'guest' && project.userId)
        throw new UniModelerError('No permission for access');

    return permission;
}

export async function validateEditingPermission(projectId, userId) {
    let permission = await validateAccessPermission(projectId, userId);

    if (permission !== 'edit' && permission !== 'owner' && permission !== 'guest')
        throw new UniModelerError('No permission for editing');

    return permission;
}

export async function validateOwnerPermission(projectId, userId) {
    let permission = await validateAccessPermission(projectId, userId);

    if (permission !== 'owner' && permission !== 'guest')
        throw new UniModelerError('No owner permission');

    return permission;
}

export async function validateOwnerChange(projectId, userId) {
    let permission = await validateAccessPermission(projectId, userId);

    if(permission !== 'guest')
        throw new UniModelerError('No permission for changing the owner of the project');

    return permission;
}