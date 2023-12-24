import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import JSONController from './controller/jsonController.js';

const server = express();

server.use(express.json());
server.use(cors());

server.use(JSONController);

server.listen(process.env.PORT, () => console.log("API ONLINE NA PORTA " + process.env.PORT));