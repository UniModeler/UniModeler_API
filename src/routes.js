import express from 'express'



// teste
import testeController from './controller/teste/testeController.js'

// modeler
import modelerController from './controller/modeler/modelerController.js'

// auth
import * as auth from './controller/base/auth.js'
import userController from './controller/user_info/userInfoController.js';





export default function configRotas(servidor) {
  // storage
  servidor.use('/storage/avatar', express.static('storage/paciente/avatar'));

  // modeler
  servidor.use('/modeler', modelerController);

  // teste
  servidor.use('/teste', testeController);

  // user_info
  servidor.use('/user', userController);
}