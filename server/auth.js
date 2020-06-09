const Boom = require("@hapi/boom");
const JWT = require('jsonwebtoken');
const isEmail = require('is-email');
const gravatar = require('gravatar');
const { v4: uuid } = require("uuid");
const secret = 'lavanreact-top';

module.exports = async function (server) {

    let refreshTokens = {

    };

    const validate = async function (decoded, request, h) {

        // do your checks to see if the person is valid
        if (decoded.issuer === "lavanreact") {
            return { isValid: true };
        }
        else {
            return { isValid: false };
        }
    };

    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt',
        {
            key: secret, // Never Share your secret key
            validate  // validate function defined above
        });

    server.auth.default('jwt');

    server.route({
        method: 'POST',
        path: '/token',
        options: {
            auth: false,
            cors: true
        },
        handler(request, h) {

            const { payload } = request

            if (payload.grant_type === "refresh_token") {

                const data = refreshTokens[payload.refresh_token];

                if (!data) {
                    throw Boom.badRequest("Refresh token inválido");
                }

                const token = JWT.sign(data.obj, secret, { expiresIn: '5m' });

                return {
                    access_token: token,
                    refresh_token: data.token
                };

            }

            if (payload.grant_type !== "password") {
                throw Boom.badRequest("grant_type invalido");
            }

            if (!payload.username) throw Boom.badRequest("Deve ser informado um usuário");
            if (!isEmail(payload.username)) throw Boom.badRequest("Deve ser informado um email válido");
            if (!payload.password || payload.password.length < 6) throw Boom.badRequest("Deve ser informado uma senha com mais de 6 caracteres");

            let permissions = ["servicos.listar"];

            if (payload.username.includes("@nuvem")) {
                permissions = [
                    "servicos.listar",
                    "servicos.criar",
                    "servicos.alterar",
                    "servicos.remover",
                    "agenda.listar",
                ];
            }
            const obj = {
                username: payload.username,
                profile_avatar: gravatar.url(payload.username),
                sub: payload.username,
                issuer: "lavanreact",
                permissions
            }; // object/info you want to sign

            const token = JWT.sign(obj, secret, { expiresIn: '5m' });

            const refresh_token = uuid();

            refreshTokens[refresh_token] = { obj, token: refresh_token };

            return {
                access_token: token,
                refresh_token: refresh_token
            };

        }
    })
};