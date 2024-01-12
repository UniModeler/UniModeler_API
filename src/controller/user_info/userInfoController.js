import {Router} from 'express';
import doIt from '../base/doIt.js';
import { listarLinksService, inserirLinkService } from '#domain/user_info/index';

const endpoints = Router();

endpoints.get('/listarLinks', (req, resp) => {
    doIt(req, resp, async () => {
        let ipAdress = req.ip;

        let links = await listarLinksService(ipAdress);
        console.log(req.ip);

        return links;
    })
})

endpoints.post('/inserirLink', (req, resp) => {
    doIt(req, resp, async () => {
        let infoLink = {
            jsString: req.body.jsString,
            ipAdress: req.ip
        }

        let insertLink = await inserirLinkService(infoLink);
        console.log(req.ip);

        return insertLink;
    })
})

export default endpoints;