import { Router } from "express";
import * as service from '#domain/projects/index'
import doIt from '../base/doIt.js';

const endpoints = Router();

// collaboration

endpoints.get('/collaboration/:id', (req, resp) => {
    doIt(req, resp, async () => {
        let userId = req.params.id;

        let projects = await service.queryCollaborationProjectsService(userId);

        return projects;
    })
})

endpoints.post('/:id/collaborator', (req, resp) => {
    doIt(req, resp, async () => {
        let id = req.params.id;
        let collaboratorId = req.query.collaboratorId;

        let r = await service.addCollaboratorService(id, collaboratorId);

        return r;
    })
})

endpoints.put('/:id/collaborator', (req, resp) => {
    doIt(req, resp, async () => {
        let id = req.params.id;
        let collaboratorId = req.body.collaboratorId;
        let permission = req.body.permission;

        let r = await service.updateCollaboratorService(id, collaboratorId, permission);

        return r;
    })
})

endpoints.delete('/:id/collaborator', (req, resp) => {
    doIt(req, resp, async () => {
        let id = req.params.id;
        let collaboratorId = req.body.collaboratorId;

        let r = await service.deleteCollaboratorService(id, collaboratorId, permission);

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

endpoints.put('/link/:id', (req, resp) => {
    doIt(req, resp, async () => {
        let projectId = req.params.id;
        let permission = req.query.permission;

        let r = await service.updateLinkService(projectId, permission);

        return r;
    })
})

export default endpoints;