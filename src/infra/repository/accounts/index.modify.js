import { connect } from '../base/connection.js';
const [db] = connect('accounts');

export async function registerUser(userInfo) {
    let r = await db.insertOne({
        info: {
            name: userInfo.name,
            company: userInfo.company,
            expertise: userInfo.expertise
        },
        auth: {
            email: userInfo.email,
            password: userInfo.password,
            recover: {
                code: '',
                expires: ''
            }
        },
        subscription: {
            type: 'free',
            ts: new Date().toISOString()
        },
        active: true,
        lastAccess: new Date().toISOString(),
        ts: new Date().toISOString()
    });

    return r;
}

export async function handleLogin(id) {
    let r = await db.updateOne({
        _id: id
    }, {
        $set: {lastAccess: new Date().toISOString()}
    })

    return r;
}