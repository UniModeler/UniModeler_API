import { connect } from '../base/connection.js';
import randomColor from 'randomcolor';
const [db] = connect('accounts');

export async function registerUser(userInfo) {
    let r = await db.insertOne({
        'info': {
            'name': userInfo.name,
            'company': userInfo.company,
            'expertise': userInfo.expertise
        },
        'auth': {
            'email': userInfo.email,
            'password': userInfo.password,
            'recover': {
                'code': '',
                'expires': ''
            }
        },
        'subscription': {
            'type': 'free',
            'ts': new Date().toISOString()
        },
        'active': true,
        'lastAccess': new Date().toISOString(),
        'profileColor': randomColor({
            luminosity: 'bright',
            hue: 'random'
        }),
        'ts': new Date().toISOString()
    });

    return r;
}