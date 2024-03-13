import * as ast from 'acorn';
import { dataType, thereIsComment, verifyName } from './utils.js';

let comments = [];

export function estruturaObjeto(jsString) {
    comments = [];
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
            let entityAttributes = infoObjectNode(node.declarations[0].init, comments);

            entities.push({
                entity: entityName,
                attributes: entityAttributes
            })
        }
    });

    return entities;
}

function infoObjectNode(objectExpression) {
    let attributes = [];
        
    for (let property of objectExpression.properties) {
        let name = property.key.raw ? property.key.raw : property.key.name;
        name = name.replaceAll("'", '');

        let type = dataType(property.value);
        let nestedAttributes;
        let description = thereIsComment(property.loc, comments);
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
        }

        verifyName(infoField, property);

        attributes.push(infoField)
    };

    return attributes;
}