import * as repo from '#infra/repository/accounts/index';
import { validarLogin } from '../validacao/validarLogin.js';

export async function loginService(userInfo) {
    let login = await repo.queryUserInfo.queryLogin(userInfo);
    
    validarLogin(login);
    
    await repo.modifyUserInfo.handleLogin(login._id);
    login = await repo.queryUserInfo.queryLogin(userInfo);

    return login;
}