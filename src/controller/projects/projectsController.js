import { Router } from "express";
import * as service from '#domain/projects/index'
import doIt from "../base/doIt.js";
import multer from 'multer';

const upload = multer({dest: 'storage/user/projects_cover'})
const endpoints = Router();

endpoints.get('/', (req, resp) => {
  doIt(req, resp, async () => {
    let userId = req.query.userId;

    let projects = await service.queryAllProjectsService(userId);

    return projects;
  })
})

endpoints.get('/:id', (req, resp) => {
  doIt(req, resp, async () => {
    let id = req.params.id;
    let userId = req.query.userId;

    let projects = await service.queryProjectService(id, userId);

    return projects;
  })
})

endpoints.get('/link/:code', (req, resp) => {
  doIt(req, resp, async () => {
    let code = req.params.code;

    let project = await service.queryCodeService(code);

    return project;
  })
})

endpoints.post('/', (req, resp) => {
  doIt(req, resp, async () => {
    let projectInfo = req.body;

    let r = await service.insertProjectService(projectInfo);

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

endpoints.put('/:id/collaborator', (req, resp) => {
  doIt(req, resp, async () => {
    let id = req.params.id;
    let collaboratorId = req.body.collaboratorId;
    let permission = req.body.permission;

    let r = await service.addCollaboratorService(id, collaboratorId, permission);

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

export default endpoints;

// 