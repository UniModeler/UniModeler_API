import swaggerAutogen from 'swagger-autogen';
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const doc = {
    info: {
        title: 'UniModeler_API',
        description: 'API of the UniModeler data modeling application.'
    },
    host: 'localhost:5000'
};

const outputFile = './swagger-output.json';
const routes = ['../src/index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc).then(() => {
    require('../src/index.js')
});