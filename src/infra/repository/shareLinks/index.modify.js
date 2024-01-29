import { generateIDFromTime } from '../../../util/generateID.js';
import { connect } from '../base/connection.js';
const [db] = connect('sharedLinks');

export async function insertSharedLink(linkInfo) {
    let r = await db.insertOne({
        code: generateIDFromTime(),
        jsonModel: linkInfo.jsString,
        ipAdress: linkInfo.ipAdress,
        ts: new Date()
    })

    console.log({
        code: generateIDFromTime(),
        jsonModel: linkInfo.jsString,
        ipAdress: linkInfo.ipAdress,
        ts: new Date()
    });

    return r;
}