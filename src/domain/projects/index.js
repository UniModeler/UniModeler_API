import { insertProjectService, duplicateProjectService } from "./servicos/insertService.js";
import { updateProjectService, renameProjectService, updateUserService, addImageService } from "./servicos/updateService.js";
import { queryProjectService, queryUserProjectsService } from "./servicos/queryService.js";
import { deleteProjectService } from "./servicos/deleteService.js";

import { addCollaboratorService } from "./servicos/share/insertService.js";
import { updateCollaboratorService, updateLinkService } from "./servicos/share/updateService.js";
import { queryCollaborationProjectsService, queryCodeService } from "./servicos/share/queryService.js";
import { deleteCollaboratorService } from "./servicos/share/deleteService.js";

export {
    insertProjectService,
    duplicateProjectService,
    updateProjectService,
    renameProjectService,
    updateUserService,
    addImageService,
    queryProjectService,
    queryUserProjectsService,
    deleteProjectService,
    updateCollaboratorService,
    updateLinkService,
    addCollaboratorService,
    queryCollaborationProjectsService,
    queryCodeService,
    deleteCollaboratorService
}