import { connect } from "../base/connection.js";
const [db] = connect('sharedLinks');

export async function listar(ipAdress) {
  let links = await db.find({
    "ipAdress": ipAdress
  }).toArray();

  console.log(links);

  return links;
}
