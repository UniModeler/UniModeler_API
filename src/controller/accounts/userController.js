import { Router } from "express";
import doIt from "../base/doIt.js";
import * as service from '#domain/accounts/index';

const endpoints = Router();

endpoints.post('/login', async (req, resp) => {
    doIt(req, resp, async () => {
        let userInfo = req.body;
        
        let login = await service.loginService(userInfo);

        return login;
    })
})

endpoints.post('/register', async (req, resp) => {
    doIt(req, resp, async () => {
        let userInfo = req.body;

        let account = await service.registerService(userInfo);

        return account;
    })
})

export default endpoints;