'use strict';

const server = require('./config/server');
const baseRouter = require('./routes');
const { addJwtAuth } = require('./config/authenticate')

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const init = async () => {
    const swaggerOptions = {
        documentationPath: '/docs',
        basePath: '/codelogicx',
        grouping: 'tags',
        info: {
                title: 'Test API Documentation',
                version: Pack.version,
            },
        };

    await addJwtAuth(server);

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    await server.register(baseRouter,{
        routes:{
            prefix:'/codelogicx'
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();