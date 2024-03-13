export function dataType(propertyValue) {
    let type;

    if (propertyValue.type === 'Literal') {
        type = typeof (propertyValue.value);

        let dataRegExp = /(?:(?:1[6-9]|[2-9]\d)?\d{2})(?:(?:(\/|-|\.)(?:0?[13578]|1[02])\1(?:31))|(?:(\/|-|\.)(?:0?[13-9]|1[0-2])\2(?:29|30)))$|^(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(\/|-|\.)0?2\3(?:29)$|^(?:(?:1[6-9]|[2-9]\d)?\d{2})(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:0?[1-9]|1\d|2[0-8])/

        if (type === 'number') {
            type = Number.isInteger(propertyValue.value) ? 'int' : 'double';
        }

        if (type === 'string' && dataRegExp.test(propertyValue.value)) {
            if (/[0-2][0-9]:[0-5][0-9]/.test(propertyValue.value)) {
                type = 'datetime';
            } else {
                type = 'date';
            }

        } else if (/^[0-2][0-9]:[0-5][0-9]$/.test(propertyValue.value)) {
            type = 'time';
        }
    }

    if (propertyValue.type === 'ObjectExpression') {
        type = 'object'
    }

    if (propertyValue.type === 'ArrayExpression') {
        type = 'array';

        if (propertyValue.elements[0]) {
            type += '_' + dataType(propertyValue.elements[0]);
        }
    }

    return type;
}

export function thereIsComment(location, comments) {
    let comment;

    for (let com of comments) {
        if (com.startLoc.line === location.start.line || com.startLoc.line === location.end.line)
            comment = com.text.trim();
    }

    return comment;
}

export function verifyName(infoField, property) {
    let firstChar = infoField.name.charAt(0);

    switch (firstChar) {
        case '?':
            infoField.optional = true;
            infoField.name = infoField.name.replace('?', '');
            break;

        case '!':
            infoField.key = 'primary key';
            infoField.name = infoField.name.replace('!', '');
            break;

        case '#':
            infoField.key = 'foreign key';
            infoField.name = infoField.name.replace('#', '');
            infoField.references = property.value.value;
            infoField.example = undefined;
            break;

        case '_':
            infoField.name = infoField.name.replace('_', '');
            infoField.type = `'${String(property.value.value)}'`;
            infoField.example = undefined;
            break;
    }
}