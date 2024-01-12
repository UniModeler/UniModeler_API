import { connect } from "../base/connection.js";
const [db] = connect('sharedLinks');

export async function listar(ipAdress) {
  let links = db.find({})

  console.log(links);

  return links;
}
