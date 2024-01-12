import {Router} from 'express';
import doIt from '../base/doIt.js';
import { listarLinksService, inserirLinkService } from '#domain/user_info/index';

const endpoints = Router();

endpoints.get('/link', (req, resp) => {
    doIt(req, resp, async () => {
        let links = await listarLinksService(req.socket.remoteAddress);

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

        return insertLink;
    })
})

export default endpoints;