import { connect } from "../base/connection";
const [db] = connect('accounts');

export async function loginUser(userInfo) {
    let login = await db.findOne({
        email: userInfo.email,
        password: userInfo.password
    })

    return login;
}