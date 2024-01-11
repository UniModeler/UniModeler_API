import * as repo from '#infra/repository/teste/'

export async function listarService() {
  let r = await repo.query.listar();
  return r;
}

