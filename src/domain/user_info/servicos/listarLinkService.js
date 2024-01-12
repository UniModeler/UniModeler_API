import * as repo from '#infra/repository/teste/index'

export async function buscarLinksService(codigo) {
  let r = await repo.query.buscarPorCodigo(codigo);
  return r;
}

export async function countLinks(ipAdress) {
  let count = await repo.query.listarPorIP(ipAdress);

  let remainingLinks = 50 - count.length;

  return remainingLinks;
}

export async function buscarPorID(id) {
  let sharedLink = await repo.query.buscarPorID(id);

  return sharedLink;
}