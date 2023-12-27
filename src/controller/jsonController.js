import { Router } from "express";
import { estruturaObjeto } from "../repository/jsonRepository.js";

const endpoints = Router();

endpoints.post('/structure', async (req, resp) => {
    try {
        let json = req.body;

        let strucObject = estruturaObjeto(json.jsString);

        resp.send(strucObject);
        
    } catch (error) {
        resp.status(500).send(error.message);
    }
});

export default endpoints;