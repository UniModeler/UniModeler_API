import * as repo from '#infra/repository/accounts/index';

export function validarCampos(userInfo) {
    if (!userInfo.email || !userInfo.password || !userInfo.name) {
        throw new global.PsicoWaysError('Fill all the sign up camps.')
    }
}

export async function validarEmail(email) {
    let thereIsEmail = await repo.queryUserInfo.queryEmail(email);

    console.log(thereIsEmail);

    if (thereIsEmail) {
        throw new global.PsicoWaysError('This email is already registered.')
    }
}