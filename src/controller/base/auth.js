import jwt from 'jsonwebtoken'
const KEY = '===!!UniModell==='




export function gerarTokenUsuario(userInfo) {
  userInfo.role = 'user';
  return jwt.sign(userInfo, KEY)
}

export function autenticacaoUsuario(req, resp, next) {
  return autenticacao(req, resp, next, 'user');
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