import '#util/globals.js'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import configRotas from './routes.js'


const servidor = express();
servidor.use(cors());
servidor.use(express.json());


configRotas(servidor);


servidor.listen(process.env.PORT, () => console.log('API iniciada com sucesso na porta ' + process.env.PORT));

