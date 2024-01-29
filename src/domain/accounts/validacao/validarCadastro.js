export function validarCadastro(userInfo) {
    if (!userInfo.email || !userInfo.password || !userInfo.name) {
        throw new global.PsicoWaysError('Fill all the sign up camps.')
    }
}