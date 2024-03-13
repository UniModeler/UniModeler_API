import { ObjectId } from "mongodb";
import { connect } from "../base/connection.js";
import { generateIDFromTime } from "#util/generateID.js";
import { PROJECT_PROJECTION } from "./projections.js";

const [collection] = connect('projects');

export async function insertProject(projectInfo, ipAddress) {
    let currentTime = new Date().toISOString();

    let r = await collection.insertOne({
        'userId': projectInfo.userId,
        'info': {
            'name': projectInfo.name,
            'cover': projectInfo.cover
        },
        'modeling': {
            'data': projectInfo.jsContent
        },
        'share': {
            'link': {
                'code': generateIDFromTime(), 
                'permission': 'read'
            },            
            'collaborators': []
        },
        'ipAddress': ipAddress,
        'lastAccess': currentTime,
        'lastModified': currentTime,
        'ts': currentTime
    })

    if(r.acknowledged) {
        return await collection.findOne({
            _id: new ObjectId(r.insertedId)
        }, {
            projection: PROJECT_PROJECTION
        });
    }

    return r;
}

export async function updateProject(id, newModel) {
    let r = await collection.updateOne({
        _id: new ObjectId(id)
    }, {
        $set: {
            "modeling.data": newModel
        },
        $currentDate: {
            'lastModified': true
        }
    })

    return r;
}

export async function renameProject(id, newName) {
    let r = await collection.updateOne({
        _id: new ObjectId(id)
    }, {
        $set: {
            "info.name": newName
        },
        $currentDate: {
            'lastModified': true
        }
    })

    return r;
}

export async function deleteProject(id) {
    let r = await collection.deleteOne({
        _id: new ObjectId(id)
    });

    return r;
}

export async function updateProjectUser(id, userId) {
    let r = await collection.updateOne({
        _id: new ObjectId(id)
    }, {
        $set: {
            'userId': userId
        }
    });

    return r;
}

export async function addImage(projectId, imagePath) {
    let r = await collection.updateOne({
        _id: new ObjectId(projectId)
    }, {
        $set: {
            "info.cover": imagePath
        },
        $currentDate: {
            'lastModified': true
        }
    });

    return r;
}