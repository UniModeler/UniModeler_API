import { Router } from "express";
import * as service from '#domain/projects/index'
import doIt from "../base/doIt.js";

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

endpoints.put('/:projectID', (req, resp) => {
  doIt(req, resp, async () => {
    let projectInfo = req.body;
    let projectID = req.params.projectID;

    let r = await service.updateProjectService(projectID, projectInfo);

    return r;
  })
})

endpoints.delete('/:projectID', (req, resp) => {
  doIt(req, resp, async () => {
    let projectID = req.params.projectID;

    let r = await service.deleteProjectService(projectID);

    return r;
  })
})

export default endpoints;