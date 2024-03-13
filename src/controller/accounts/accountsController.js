import e, { Router } from "express";
import doIt from "../base/doIt.js";
import * as service from '#domain/accounts/index';
import { autenticacaoUsuario, gerarTokenUsuario } from "../base/auth.js";

const endpoints = Router();

endpoints.post('/login', (req, resp) => {
	doIt(req, resp, async () => {
		let userInfo = req.body;

		let user = await service.loginService(userInfo);
		let token = gerarTokenUsuario(user);

		return { token, user };
	})
})

endpoints.post('/register', (req, resp) => {
	doIt(req, resp, async () => {
		let userInfo = req.body;

		await service.registerService(userInfo);
		let user = await service.loginService(userInfo);
		let token = gerarTokenUsuario(user);

		return { token, user };
	})
})

endpoints.get('/email', autenticacaoUsuario, (req, resp) => {
	doIt(req, resp, async () => {
		let email = req.query.address;

		let r = await service.getUserByEmailService(email);

		return r;
	})
})

endpoints.get('/:id', autenticacaoUsuario, (req, resp) => {
	doIt(req, resp, async () => {
		let id = req.params.id;

		let r = await service.getUserByIdService(id);

		return r;
	})
})

export default endpoints;