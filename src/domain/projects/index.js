import { insertProjectService } from "./servicos/insertService.js";
import { updateProjectService, updateUserService, addImageService, addCollaboratorService } from "./servicos/updateService.js";
import { queryProjectService, queryAllProjectsService, queryCodeService } from "./servicos/queryService.js";
import { deleteProjectService } from "./servicos/deleteService.js";

export {
    insertProjectService,
    updateProjectService,
    updateUserService,
    addImageService,
    addCollaboratorService,
    queryProjectService,
    queryAllProjectsService,
    queryCodeService,
    deleteProjectService
}