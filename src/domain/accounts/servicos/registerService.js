import * as repo from '#infra/repository/accounts/index';
import { validarCampos, validarEmail } from '../validacao/validarCadastro.js';

export async function registerService(userInfo){
    validarCampos(userInfo);
    await validarEmail(userInfo.email);

    let register = await repo.modifyUserInfo.registerUser(userInfo);

    return register;
}