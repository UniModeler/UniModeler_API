import { connect } from "../base/connection.js";
const [db] = connect('sharedLinks');

export async function listarPorIP(ipAdress) {
  let links = await db.find({
    "ipAdress": ipAdress
  }).toArray();

  return links;
}

export async function buscarPorCodigo(codigo) {
  let sharedLink = await db.find({
    "code": codigo
  }).toArray();

  return sharedLink[0];
}

export async function buscarPorID(id) {
  let sharedLink = await db.find({
    "_id": id
  }).toArray();

  return sharedLink[0];
}