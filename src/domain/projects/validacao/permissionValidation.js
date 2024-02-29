export function validatePermission(permission, project) {
    if(project.userId && permission === 'guest') {
        throw new PsicoWaysError('No permission');
    }
}