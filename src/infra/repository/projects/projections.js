export const LIST_USER_PROJECTS_PROJECTION = {
    id: '$_id',
    _id: 0,
    userId : 1,
    info: 1,
    share: 1,
    lastAccess: 1,
    lastModified: 1,
    ts: 1
}

export const LIST_COLLABORATION_PROJECTS_PROJECTION = {
    id: '$_id',
    _id: 0,
    userId : 1,
    info: 1,
    'share.collaborators': 1,
    'share.link.permission': 1,
    lastAccess: 1,
    lastModified: 1,
    ts: 1
}

export const PROJECT_PROJECTION = {
    id: '$_id',
    _id: 0,
    userId : 1,
    info: 1,
    modeling: 1,
    share: 1,
    lastAccess: 1,
    lastModified: 1,
    ts: 1
}