import * as repo from '#infra/repository/teste/index'

export function listarLinksService(ipAdress) {
  let r = repo.query.listar(ipAdress);
  return r;
}