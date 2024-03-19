import '#util/globals.js'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import rotas from './routes.js'

const servidor = express();
servidor.use(cors());
servidor.use(express.json());

servidor.set('trust proxy', true);

servidor.use(rotas);

servidor.listen(process.env.PORT, () => console.log('API iniciada com sucesso na porta ' + process.env.PORT));