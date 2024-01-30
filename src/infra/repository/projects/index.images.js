import { ObjectId } from "mongodb";
import { connect } from "../base/connection.js";

const [collection] = connect('projects');

export async function addImage(projectId, imagePath) {
    
    let r = await collection.updateOne({
        _id: new ObjectId(projectId)
    }, {
        $set: {"info.cover": imagePath},
        $currentDate: {lastModified: true}
    });

    return r;
}