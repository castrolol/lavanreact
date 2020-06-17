const Boom = require("@hapi/boom");
const moment = require("moment");
const dates = require("./dates.fake.api");
let ids = 10;




module.exports = function (server) {

    server.route({
        method: 'GET',
        path: '/servicos',
        options: {
            cors: true
        },
        handler: (request, h) => {
            return servicos;
        }
    });

    server.route({
        method: 'GET',
        path: '/servicos/{id}',
        options: {
            cors: true
        },
        handler: (request, h) => {
            const id = request.params.id;
            return servicos.filter(s => s.id == id)[0];
        }
    });

    server.route({
        method: 'PUT',
        path: '/servicos/{id}',
        options: {
            cors: true
        },
        handler: (request, h) => {
            const id = request.params.id;
            const payload = request.payload;
            const service = servicos.filter(s => s.id == id)[0];

            if (!service) {
                throw Boom.badRequest('Serviço inexistente');
            }

            const index = servicos.indexOf(service);
            servicos[index] = { ...service, ...payload };

            return servicos[index];
        }
    });

    server.route({
        method: 'POST',
        path: '/servicos',
        options: {
            cors: true
        },
        handler: (request, h) => {
            const payload = request.payload;

            payload.id = (ids++);
            servicos.push(payload);

            return payload;
        }
    });

    server.route({
        method: 'DELETE',
        path: '/servicos/{id}',
        options: {
            cors: true
        },
        handler: (request, h) => {
            const id = request.params.id;

            const service = servicos.filter(s => s.id == id)[0];

            if (!service) {
                throw Boom.badRequest('Serviço inexistente');
            }

            const index = servicos.indexOf(service);
            


            return servicos.splice(index, 1)[0];
        }
    });



    server.route({
        method: 'GET',
        path: '/agenda',
        options: {
            auth: false,
            cors: true
        },
        handler: (request, h) => {
            

            return dates;
        }
    });



    

    const servicos = [
        {
            "id": 1,
            "nome": "Ténis",
            "unidade_medida": "Par",
            "preco": 30.75,
            "entrega": 2
        },
        {
            "id": 2,
            "nome": "Peça Intima",
            "unidade_medida": "Peça",
            "preco": 3.15,
            "entrega": 1
        },
        {
            "id": 3,
            "nome": "Camiseta",
            "unidade_medida": "Peça",
            "preco": 4,
            "entrega": 2
        },
        {
            "id": 4,
            "nome": "Camisa",
            "unidade_medida": "Peça",
            "preco": 14,
            "entrega": 4
        },
        {
            "id": 5,
            "nome": "Lençol",
            "unidade_medida": "Kg",
            "preco": 24.4,
            "entrega": 4
        }
    ];


};