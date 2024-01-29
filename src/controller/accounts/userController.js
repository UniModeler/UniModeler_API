import { Router } from "express";
import doIt from "../base/doIt";
import * as service from '#domain/user/index';

const endpoints = Router();

endpoints.post('/login', async (req, resp) => {
    doIt(req, resp, async () => {
        let userInfo = req.body;

        
    })
})

endpoints.post('/register', async (req, resp) => {
    
})

export default endpoints;