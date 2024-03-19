import { Router } from "express";
import * as service from '#domain/projects/index'
import doIt from '../base/doIt.js';
import { autenticacaoUsuario } from "../base/auth.js";

const endpoints = Router();

// collaboration

endpoints.get('/collaboration/', autenticacaoUsuario, (req, resp) => {
  doIt(req, resp, async () => {
    let userId = req.user.id;

    let projects = await service.queryCollaborationProjectsService(userId);

    return projects;
  })
})

endpoints.post('/:id/collaborator/:collaboratorId', autenticacaoUsuario, (req, resp) => {
  doIt(req, resp, async () => {
    let projectId = req.params.id;
    let collaboratorId = req.params.collaboratorId;
    let userId = req.user.id;

    let r = await service.addCollaboratorService(projectId, userId, collaboratorId);

    return r;
  })
})

endpoints.put('/:id/collaborator/:collaboratorId', autenticacaoUsuario, (req, resp) => {
  doIt(req, resp, async () => {
    let projectId = req.params.id;
    let userId = req.user.id;
    let collaboratorId = req.params.collaboratorId;
    let permission = req.query.permission;

    let r = await service.updateCollaboratorService(projectId, userId, collaboratorId, permission);

    return r;
  })
})

endpoints.delete('/:id/collaborator', autenticacaoUsuario, (req, resp) => {
  doIt(req, resp, async () => {
    let id = req.params.id;
    let userId = req.user.id;
    let collaboratorId = req.body.collaboratorId;

    let r = await service.deleteCollaboratorService(id, userId, collaboratorId, permission);

    return r;
  })
})


// share links

endpoints.get('/link/:code', (req, resp) => {
  doIt(req, resp, async () => {
    let code = req.params.code;

    let project = await service.queryCodeService(code);

    return project;
  })
})

endpoints.put('/link/:id', autenticacaoUsuario, (req, resp) => {
  doIt(req, resp, async () => {
    let projectId = req.params.id;
    let permission = req.query.permission;
    let userId = req.user.id;

    let r = await service.updateLinkService(projectId, userId, permission);

    return r;
  })
})

export default endpoints;