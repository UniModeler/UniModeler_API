export function estruturaObjeto(objeto) {
    
    let struct = {
        entity: "JSON",
        attributes: []
    };

    struct.attributes = buscarAtributos(objeto);

    return struct;
}

function buscarAtributos(objeto) {
    let arrayAtributos = [];

    for(let prop in objeto) {
        let tipo = tipoDo(objeto[prop]);
        let attributes;

        // se a prop atual for um objeto, repita o processo
        if(tipo === 'object') {
            attributes = buscarAtributos(objeto[prop]);
        }

        // adiciona a prop atual no array de atributos
        if(!attributes) {
            arrayAtributos.push({
                name: prop,
                type: tipo,
            })    
        } else {
            arrayAtributos.push({
                name: prop,
                type: tipo,
                attributes: attributes
            })
        }
    }

    return arrayAtributos;
}

function tipoDo(variable) {
    let tipo = typeof(variable);
    
    if(tipo === 'object' && variable.length) {
        return 'array';
    } else {
        return tipo;
    }
}