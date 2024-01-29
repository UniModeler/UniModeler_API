import { connect } from '../base/connection.js';
const [db] = connect('accounts');

export async function registerUser(userInfo){
    let r = await db.insertOne({
        username: userInfo.username,
        email: userInfo.email,
        password: userInfo.password
    });

    return r;
}