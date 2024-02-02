import express from 'express'

// teste
import testeController from './controller/teste/testeController.js'

// modeler
import modelerController from './controller/modeler/modelerController.js'

// auth
import * as auth from './controller/base/auth.js'

// share links
import linksController from './controller/shareLinks/shareLinksController.js';

// user accounts
import accountsController from './controller/accounts/userController.js';

import projectsController from './controller/projects/projectsController.js';


export default function configRotas(servidor) {
  // storage
  servidor.use('/storage/avatar', express.static('storage/paciente/avatar'));
  servidor.use('/storage/user/projects_cover', express.static('storage/user/projects_cover'));

  // modeler
  servidor.use('/modeler', modelerController);

  // teste
  servidor.use('/teste', testeController);

  // shareLinks
  servidor.use('/link', linksController);

  // user accounts
  servidor.use('/accounts', accountsController);

  servidor.use('/projects', projectsController);
}