export function validarLogin(loginInfo) {
  if(!loginInfo){
    throw new global.UniModelerError('Username or password incorrect.');
  }
}