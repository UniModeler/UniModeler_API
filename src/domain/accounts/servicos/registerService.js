import * as repo from '#infra/repository/accounts/index';
import { validarCadastro } from '../validacao/validarCadastro.js';

export async function registerService(userInfo){
    validarCadastro(userInfo);

    let register = await repo.modifyUserInfo.registerUser(userInfo);
    return register;
}