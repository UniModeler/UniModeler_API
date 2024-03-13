import { getUserInfo } from "../controller/base/auth.js";


global.log = (msg) => {
  console.log(msg);
}

global.sleep = (wait=100) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, wait)
  })
}

global.sleepAndDo = (action, wait=100) => {
  setTimeout(action, wait)
}



global.logError = (err, req) => {
  const trackCode = parseInt(Math.random() * 99999);
  
  console.log('\n\n======================');
  console.log('Ocurrency Time:', new Date());
  console.log('Request Params:', req.params);
  console.log('Request Query:', req.query);
  console.log('Request Body:', req.body);
  console.log('Logged User:', getUserInfo(req));
  console.log('Track code:', trackCode);
  console.log('Error code:', err.code || 500);
  console.log(err.stack ?? err.message)
  
  return trackCode;
}



global.logDiscordError = (err, interaction) => {
  const trackCode = parseInt(Math.random() * 99999);
  
  console.log('\n\n======================');
  console.log('Ocurrency Time:', new Date());
  // console.log('Interaction:', interaction);
  console.log('Track code:', trackCode);
  console.log('Error code:', err.code || 500);
  console.log(err.stack ?? err.message)
  
  return trackCode;
}



global.UniModelerError = class UniModelerError extends Error {
  constructor(msg, code, options) {
    super(msg);
    this.code = code || 400;
    this.name = 'UniModelerError'; 
    this.options = options;
  }
}

