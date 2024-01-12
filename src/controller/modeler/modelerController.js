import { Router } from 'express'
import doIt from '../base/doIt.js';

import * as modeler from '#domain/modeler/index';


const endpoints = Router();


endpoints.post('/structure', async (req, resp) => {
  doIt(req, resp, () => {
    let json = req.body;
    let strucObject = modeler.transformToDbModel(json.jsString);
    return strucObject;
  })
});



export default endpoints;