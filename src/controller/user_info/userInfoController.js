import {Router} from 'express';
import doIt from '../base/doIt.js';
import { buscarLinksService, inserirLinkService } from '#domain/user_info/index';
import { buscarPorID } from '#domain/user_info/index.js';
import { countLinks } from '../../domain/user_info/index.js';

const endpoints = Router();

endpoints.get('/link/:code', (req, resp) => {
    doIt(req, resp, async () => {
        let code = req.params.code;

        let links = await buscarLinksService(code);

        if(!links) {
            throw new global.PsicoWaysError('Não foi possível carregar o link compartilhado.')
        } 

        return links;
    })
})

endpoints.post('/link', (req, resp) => {
    doIt(req, resp, async () => {

        let infoLink = {
            jsString: req.body.jsString,
            ipAdress: req.socket.remoteAddress
        }

        let insertLink = await inserirLinkService(infoLink);

        if(insertLink.acknowledged) {
            let link = await buscarPorID(insertLink.insertedId);
            link.remaining = await countLinks(req.socket.remoteAddress);

            return link;
        } else {
            throw new global.PsicoWaysError('Algo deu errado ao gerar seu link.');
        }
    })
})

export default endpoints;