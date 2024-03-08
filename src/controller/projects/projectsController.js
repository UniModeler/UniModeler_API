import { Router } from "express";
import { autenticacaoUsuario, autenticacaoUsuarioOpcional } from "../base/auth.js";
import * as service from '#domain/projects/index'
import doIt from "../base/doIt.js";
import multer from 'multer';

const upload = multer({dest: 'storage/user/projects_cover'})
const endpoints = Router();

import projectShareController from './projectsShareController.js';

endpoints.get('/user', autenticacaoUsuario, (req, resp) => {
  doIt(req, resp, async () => {
    let userId = req.user.id;

    let projects = await service.queryUserProjectsService(userId);

    return projects;
  })
})

endpoints.get('/:id', autenticacaoUsuarioOpcional, (req, resp) => {
  doIt(req, resp, async () => {
    let id = req.params.id;
    let userId = req.user?.id;

    let projects = await service.queryProjectService(id, userId);

    return projects;
  })
})

endpoints.post('/', (req, resp) => {
  doIt(req, resp, async () => {
    let projectInfo = req.body;
    let ipAddress = req.socket.remoteAddress

    let r = await service.insertProjectService(projectInfo, ipAddress);

    return r;
  })
})

endpoints.put('/:id', (req, resp) => {
  doIt(req, resp, async () => {
    let projectInfo = req.body;
    let projectID = req.params.id;

    let r = await service.updateProjectService(projectID, projectInfo);

    return r;
  })
})

endpoints.put('/:id/user', (req, resp) => {
  doIt(req, resp, async () => {
    let id = req.params.id;
    let userId = req.body.userId;
  
    let r = await service.updateUserService(id, userId);

    return r;
  })
})

endpoints.delete('/:id', (req, resp) => {
  doIt(req, resp, async () => {
    let projectID = req.params.id;

    let r = await service.deleteProjectService(projectID);

    return r;
  })
})

// projects cover images control

endpoints.put('/:id/cover', upload.single('cover-image'), (req, resp) => {
  doIt(req, resp, async () => {
    let projectID = req.params.id;
    let imagePath = req.file.path;

    let r = await service.addImageService(projectID, imagePath);

    return r;
  })
})

endpoints.use(projectShareController);

export default endpoints;