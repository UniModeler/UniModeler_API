import { connect } from "../base/connection.js";
const [dbTeste] = connect('teste');


export function listar() {
  return dbTeste.find().toArray();
}
