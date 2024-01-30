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

    let projects = await service.queryProjectService(id);

    return projects;
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