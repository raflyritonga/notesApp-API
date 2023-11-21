const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 8000,
    host: 'localhost',
    // kode di bawah ini berguna untuk memungkinkan server untuk mengakses origin yang berbeda. dan mengatasi masalah same-origin policy
    routes: {
      cors: {
        origin: ['*'],
      },
    },

  });
  server.route(routes);
  await server.start();
  console.info(`Server berjalan pada ${server.info.uri}`);
};
init();
