import { ObjectId } from "mongodb";
import { connect } from "../base/connection.js";
const [db] = connect('accounts');

export async function queryLogin(userInfo) {
    let login = await db.findOneAndUpdate({
        "auth.email": userInfo.email,
        "auth.password": userInfo.password
    }, {
        $currentDate: { lastAccess: true }
    }, {
      returnDocument: 'after',
      projection: {
        id: '$_id',
        _id: 0,
        // adicionar e jogar pra variavel projection em outro arquivo
      }
    })

    return login;
}

export async function queryEmail(email) {
    let r = await db.findOne({
        "auth.email": email
    })

    return r;
}

export async function getUserById(userId) {
    let r = await db.find({
        _id: new ObjectId(userId)
    }).project({id: '$_id', _id: 0, info: 1, "auth.email": 1, profileColor: 1}).toArray();

    return r[0];
}




const PROJECTION = {

}