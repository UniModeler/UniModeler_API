import { ObjectId } from "mongodb";
import { connect } from "../base/connection.js";
import { EMAIL_QUERY_PROJECTION, LOGIN_PROJECTION, PUBLIC_USER_PROJECTION } from "./projections.js";
const [db] = connect('accounts');

export async function queryLogin(userInfo) {
    let login = await db.findOneAndUpdate({
        "auth.email": userInfo.email,
        "auth.password": userInfo.password
    }, {
        $currentDate: { lastAccess: true }
    }, {
      returnDocument: 'after',
      projection: LOGIN_PROJECTION
    })

    return login;
}

export async function queryEmail(email) {
    let r = await db.findOne({
        "auth.email": email
    }, {
        projection: EMAIL_QUERY_PROJECTION
    })

    return r;
}

export async function getUserById(userId) {
    let r = await db.findOne({
        _id: new ObjectId(userId)
    }, {
        projection: PUBLIC_USER_PROJECTION
    });

    return r;
}