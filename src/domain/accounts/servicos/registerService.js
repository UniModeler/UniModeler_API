import * as repo from '#infra/repository/user/index';

export async function registerService(userInfo){
    let register = await repo.modifyUserInfo.registerUser(userInfo);

    return register;
}