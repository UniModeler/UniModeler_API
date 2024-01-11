
export default async function doIt(req, resp, action) {
  try {
    const r = await action();
    if (r)
      resp.send(r);
    else
      resp.status(204).send();
  }
  catch (err) {
    let statusCode = (err.code || 500);
    let trackCode = logError(err, req);

    statusCode = typeof (err.code) === 'string' ? 500 : err.code;
    statusCode = statusCode < 600 ? statusCode : 500;
    
    resp.status(statusCode)
      .send({
        trackCode: trackCode,
        erro: err.name === 'PsicoWaysError'
          ? err.message
          : 'Ocorreu um erro. Cód.' + trackCode
      })
    
  }
}

