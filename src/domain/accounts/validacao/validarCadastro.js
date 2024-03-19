import * as repo from '#infra/repository/accounts/index';

export function validarCampos(userInfo) {
  if (!userInfo.email || !userInfo.password || !userInfo.name) {
    throw new global.UniModelerError('Fill all the sign up camps.')
  }
}

export async function validarEmail(email) {
  let thereIsEmail = await repo.queryUserInfo.queryEmail(email);

  if (thereIsEmail) {
    throw new global.UniModelerError('This email is already registered.')
  }
}