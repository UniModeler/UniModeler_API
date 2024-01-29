import * as repo from '#infra/repository/user/index';

export async function loginService(userInfo) {
    let login = await repo.queryUserInfo.loginUser(userInfo);

    return login;
}