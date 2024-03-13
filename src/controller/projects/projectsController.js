import { Router } from "express";
import { autenticacaoUsuario, autenticacaoUsuarioOpcional } from "../base/auth.js";
import * as service from '#domain/projects/index'
import doIt from "../base/doIt.js";
import multer from 'multer';

import projectShareController from './projectsShareController.js';

const upload = multer({dest: 'storage/user/projects_cover'});
const endpoints = Router();

endpoints.get('/user', autenticacaoUsuario, (req, resp) => {
  doIt(req, resp, async () => {
    let userId = req.user.id;
    let projects = await service.queryUserProjectsService(userId);

    return projects;
  })
})

endpoints.get('/id/:id', autenticacaoUsuarioOpcional, (req, resp) => {
  doIt(req, resp, async () => {
    let id = req.params.id;
    let userId = req.user?.id;

    let project = await service.queryProjectService(id, userId);

    return project;
  })
})

endpoints.post('/', autenticacaoUsuarioOpcional, (req, resp) => {
  doIt(req, resp, async () => {
    let projectInfo = req.body;
    projectInfo.userId = req.user.id;

    let ipAddress = req.socket.remoteAddress;

    let r = await service.insertProjectService(projectInfo, ipAddress);

    return r;
  })
})

endpoints.post('/:id/duplicate', autenticacaoUsuario, (req, resp) => {
  doIt(req, resp, async () => {
    let projectId = req.params.id;
    let userId = req.user.id;
    let ipAddress = req.socket.remoteAddress;

    let r = await service.duplicateProjectService(projectId, userId, ipAddress);

    return r;
  })
})

endpoints.put('/:id', autenticacaoUsuarioOpcional, (req, resp) => {
  doIt(req, resp, async () => {
    let { newModel } = req.body;
    let projectId = req.params.id;
    let userId = req.user.id;

    let r = await service.updateProjectService(projectId, userId, newModel);

    return r;
  })
})

endpoints.put('/:id/rename', autenticacaoUsuario, (req, resp) => {
  doIt(req, resp, async () => {
    let { newName } = req.body;
    let projectId = req.params.id;
    let userId = req.user.id;

    let r = await service.renameProjectService(projectId, userId, newName);

    return r;
  })
})

endpoints.put('/:id/user', autenticacaoUsuario, (req, resp) => {
  doIt(req, resp, async () => {
    let id = req.params.id;
    let userId = req.body.userId;
  
    let r = await service.updateUserService(id, userId);

    return r;
  })
})

endpoints.delete('/:id', autenticacaoUsuario, (req, resp) => {
  doIt(req, resp, async () => {
    let projectId = req.params.id;
    let userId = req.user.id;

    let r = await service.deleteProjectService(projectId, userId);

    return r;
  })
})

// projects cover images control

endpoints.put('/:id/cover', autenticacaoUsuario, upload.single('cover-image'), (req, resp) => {
  doIt(req, resp, async () => {
    let projectId = req.params.id;
    let imagePath = req.file.path;
    let userId = req.user.id;

    let r = await service.addImageService(projectId, userId, imagePath);

    return r;
  })
})

endpoints.use(projectShareController);

export default endpoints;