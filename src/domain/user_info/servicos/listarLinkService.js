import * as repo from '#infra/repository/teste/index'

export async function listarLinksService(ipAdress) {
  let r = await repo.query.listar(ipAdress);
  return r;
}