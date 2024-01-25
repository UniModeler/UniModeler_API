import {Router} from 'express';
import doIt from '../base/doIt.js';

import * as service from '#domain/shareLinks/index';

const endpoints = Router();

endpoints.get('/:code', (req, resp) => {
    doIt(req, resp, async () => {
        let code = req.params.code;

        let links = await service.buscarLinksService(code);

        if(!links) {
            throw new global.PsicoWaysError('Não foi possível carregar o link compartilhado.')
        } 

        return links;
    })
})

endpoints.post('/', (req, resp) => {
    doIt(req, resp, async () => {

        let infoLink = {
            jsString: req.body.jsString,
            ipAdress: req.socket.remoteAddress
        }

        let insertLink = await service.inserirLinkService(infoLink);

        if(insertLink.acknowledged) {
            let link = await service.buscarPorID(insertLink.insertedId);
            link.remaining = await service.countLinks(req.socket.remoteAddress);

            return link;
        } else {
            throw new global.PsicoWaysError('Algo deu errado ao gerar seu link.');
        }
    })
})

export default endpoints;