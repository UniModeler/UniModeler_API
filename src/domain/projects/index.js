import { insertProjectService, addCollaboratorService } from "./servicos/insertService.js";
import { updateProjectService, updateUserService, updateCollaboratorService, updateLinkService, addImageService } from "./servicos/updateService.js";
import { queryProjectService, queryUserProjectsService, queryCollaborationProjectsService, queryCodeService } from "./servicos/queryService.js";
import { deleteProjectService, deleteCollaboratorService } from "./servicos/deleteService.js";

export {
    insertProjectService,
    updateProjectService,
    updateUserService,
    updateCollaboratorService,
    updateLinkService,
    addImageService,
    addCollaboratorService,
    queryProjectService,
    queryUserProjectsService,
    queryCollaborationProjectsService,
    queryCodeService,
    deleteProjectService,
    deleteCollaboratorService
}