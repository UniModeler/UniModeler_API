export function validarLogin(loginInfo) {
    if(!loginInfo){
        throw new global.PsicoWaysError('Username or password incorrect.');
    }
}