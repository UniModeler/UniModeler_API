import { Router } from 'express'
import doIt from '../base/doIt.js';

import * as teste from '#domain/teste/index';

const endpoints = Router();


endpoints.get('/ping', (req, resp) => {
  doIt(req, resp, () => {
    let m = teste.pongService();
    return { message: m }
  })
})


endpoints.get('/listar', (req, resp) => {
  doIt(req, resp, async () => {
    let m = await teste.listarService();
    return m;
  })
})



export default endpoints;