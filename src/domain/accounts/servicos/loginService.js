import * as repo from '#infra/repository/accounts/index';
import { validarLogin } from '../validacao/validarLogin.js';

export async function loginService(userInfo) {
  let login = await repo.queryUserInfo.queryLogin(userInfo);
  
  validarLogin(login);

  return login;
}