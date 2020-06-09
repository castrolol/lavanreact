'use strict';

const Hapi = require('@hapi/hapi');
const auth = require("./auth");
const routes = require("./routes");

const init = async () => {

    const server = Hapi.server({
        port: 8000,
        host: 'localhost'
    });

    await auth(server);

    routes(server);

    await server.start();

    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();