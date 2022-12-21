'use strict';

const server = require('./config/server');
const baseRouter = require('./routes');

const init = async () => {

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });

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