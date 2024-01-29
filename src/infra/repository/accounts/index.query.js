import { connect } from "../base/connection.js";
const [db] = connect('accounts');

export async function queryLogin(userInfo) {
    let login = await db.findOne({
        "auth.email": userInfo.email,
        "auth.password": userInfo.password
    })

    return login;
}