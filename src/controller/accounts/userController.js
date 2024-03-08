import e, { Router } from "express";
import doIt from "../base/doIt.js";
import * as service from '#domain/accounts/index';
import { gerarTokenUsuario } from "../base/auth.js";

const endpoints = Router();

endpoints.post('/login', (req, resp) => {
    doIt(req, resp, async () => {
        let userInfo = req.body;
        
        let login = await service.loginService(userInfo);
        let token = gerarTokenUsuario(login);

        return { token };
    })
})

endpoints.post('/register', (req, resp) => {
    doIt(req, resp, async () => {
        let userInfo = req.body;

        await service.registerService(userInfo);
        let login = await service.loginService(userInfo);

        return login;
    })
})

endpoints.get('/email', (req, resp) => {
    doIt(req, resp, async () => {
        let email = req.query.address;

        let r = await service.getUserByEmailService(email);

        return r;
    })
})

endpoints.get('/:id', (req, resp) => {
    doIt(req, resp, async () => {
        let id = req.params.id;

        let r = await service.getUserByIdService(id);

        return r;
    })
})

export default endpoints;