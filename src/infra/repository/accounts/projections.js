export const LOGIN_PROJECTION = {
    id: '$_id',
    _id: 0,
    info: 1,
    'auth.email': 1,
    subscription: 1,
    active: 1,
    lastAccess: 1,
    profileColor: 1,
    ts: 1
}

export const EMAIL_QUERY_PROJECTION = {
    id: '$_id',
    _id: 0,
    "auth.email": 1,
    info: 1
}

export const PUBLIC_USER_PROJECTION = {
    id: '$_id',
    _id: 0,
    info: 1,
    "auth.email": 1,
    profileColor: 1
}