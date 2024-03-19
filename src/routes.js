import express, { Router } from 'express'

// teste
import testeController from './controller/teste/testeController.js'

// modeler
import modelerController from './controller/modeler/modelerController.js'

// auth
import * as auth from './controller/base/auth.js'

// user accounts
import accountsController from './controller/accounts/accountsController.js';

import projectsController from './controller/projects/projectsController.js';

const servidor = Router();
  // storage
servidor.use('/storage/avatar', express.static('storage/paciente/avatar'));
  servidor.use('/storage/user/projects_cover', express.static('storage/user/projects_cover'));

  // modeler
  servidor.use('/modeler', modelerController);

  // teste
  servidor.use('/teste', testeController);

  // user accounts
  servidor.use('/accounts', accountsController);

  // projects
  servidor.use('/projects', projectsController);

  export default servidor;