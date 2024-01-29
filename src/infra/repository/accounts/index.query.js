import { connect } from "../base/connection.js";
const [db] = connect('accounts');

export async function queryLogin(userInfo) {
    let login = await db.findOneAndUpdate({
        "auth.email": userInfo.email,
        "auth.password": userInfo.password
    }, {
        $currentDate: {lastAccess: true}
    }, {
        returnDocument: 'after'
    })

    return login;
}