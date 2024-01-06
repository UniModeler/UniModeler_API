import * as ast from 'acorn';

export function estruturaObjeto(jsString) {
    let comments = [];
    let entities = [];

    let decode = ast.parse(jsString,
        {
            ecmaVersion: "lastest",
            locations: true,
            onComment: (isBlock, text, start, end, startLoc, endLoc) =>
                comments.push({ isBlock, text, start, end, startLoc, endLoc })
        });

    decode.body.forEach(node => {
        if (node.type === 'VariableDeclaration') {
            let entityName = node.declarations[0].id.name;
            let entityAttributes = infoObjectNode(node.declarations[0].init);

            entities.push({
                entity: entityName,
                attributes: entityAttributes
            })
        }
    });

    return entities;

    function infoObjectNode(objectExpression) {
        let attributes = [];

        objectExpression.properties.forEach(property => {
            let name = property.key.raw ? property.key.raw : property.key.name;
            name = name.replaceAll("'", '');

            let type = dataType(property.value);
            let nestedAttributes;
            let description = thereIsComment(property.loc);
            let example;

            if (type === 'object') {
                nestedAttributes = infoObjectNode(property.value);
            } 
            else if (type === 'array_object') {
                nestedAttributes = infoObjectNode(property.value.elements[0])
            }               
            else {
                example = String(property.value.value);
            }

            let infoField = {
                name: name,
                type: type,
            }

            if (nestedAttributes) {
                infoField.attributes = nestedAttributes;
            }

            if (description) {
                infoField.description = description;
            }

            if (example) {
                infoField.example = example;
                console.log(infoField.example);
            }

            verifyName(infoField, property);

            attributes.push(infoField)
        });

        return attributes;
    }

    function dataType(propertyValue) {
        let type;

        if (propertyValue.type === 'Literal') {
            type = typeof (propertyValue.value);

            let dataRegExp = /(?:(?:1[6-9]|[2-9]\d)?\d{2})(?:(?:(\/|-|\.)(?:0?[13578]|1[02])\1(?:31))|(?:(\/|-|\.)(?:0?[13-9]|1[0-2])\2(?:29|30)))$|^(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(\/|-|\.)0?2\3(?:29)$|^(?:(?:1[6-9]|[2-9]\d)?\d{2})(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:0?[1-9]|1\d|2[0-8])/

            if (type === 'number') {
                type = Number.isInteger(propertyValue.value) ? 'int' : 'double';
            }

            if (type === 'string' && dataRegExp.test(propertyValue.value)) {
                if(/[0-2][0-9]:[0-5][0-9]/.test(propertyValue.value)) {
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

    function thereIsComment(location) {
        let comment;

        for (let com of comments) {
            if (com.startLoc.line === location.start.line || com.startLoc.line === location.end.line)
                comment = com.text.trim();
        }

        return comment;
    }

    function verifyName(infoField, property) {
        let firstChar = infoField.name.charAt(0);

        if (firstChar === '?') {
            infoField.optional = true;
            infoField.name = infoField.name.replace('?', '');
        }

        if (firstChar === '!') {
            infoField.key = 'primary key';
            infoField.name = infoField.name.replace('!', '');
        }

        if (firstChar === '#') {
            infoField.key = 'foreign key';
            infoField.name = infoField.name.replace('#', '');
            infoField.references = property.value.value;
            infoField.example = undefined;
        }

        if (firstChar === '_') {
            infoField.name = infoField.name.replace('_', '');
            infoField.type = `'${String(property.value.value)}'`;
            infoField.example = undefined;
        }
    }
}