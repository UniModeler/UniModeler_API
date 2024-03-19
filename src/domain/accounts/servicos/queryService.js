import * as repo from '#infra/repository/accounts/index';

export async function getUserByIdService(userId) {
  let r = await repo.queryUserInfo.getUserById(userId);

  return r;
}

export async function getUserByEmailService(email) {
  let r = await repo.queryUserInfo.queryEmail(email);

  return r;
}