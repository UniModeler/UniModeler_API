import jwt from 'jsonwebtoken'
const KEY = '===!!PsicoWays==='




export function gerarTokenPaciente(userInfo) {
  userInfo.role = 'paciente';
  return jwt.sign(userInfo, KEY)
}

export function gerarTokenPsicologo(userInfo) {
  userInfo.role = 'psicologo';
  return jwt.sign(userInfo, KEY)
}

export function gerarTokenClinica(userInfo) {
  userInfo.role = 'clinica';
  return jwt.sign(userInfo, KEY)
}



export function autenticacaoPsicologo(req, resp, next) {
  return autenticacao(req, resp, next, 'psicologo');
}

export function autenticacaoPaciente(req, resp, next) {
  return autenticacao(req, resp, next, 'paciente');
}






export function autenticacao(req, resp, next, role) {
  try {
    let token = req.headers['x-access-token'];

    if (token === undefined)
      token = req.query['x-access-token']

    let signd = jwt.verify(token, KEY);

    req.user = signd;
    if (role && signd.role !== role)
      return resp.status(401).end();

    next();

  } catch (e) {
    resp.status(401).end();
  }
}




export function getUserInfo(req) {
  try {
    let token = req.headers['x-access-token'];

    if (token === undefined)
      token = req.query['x-access-token']

    let signd = jwt.verify(token, KEY);
    return signd;
  }
  catch {
    return null;
  }
  
}