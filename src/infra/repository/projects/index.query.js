import { connect } from "../base/connection.js";

const [collection] = connect('projects');

export async function queryProjects(userId) {
    let r = await collection.find({
        userId: userId
    }).toArray();

    return r;
}