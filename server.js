
const sequelize = require('./config');
const { server } = require('./hapi.config');
const routes = require('./routes/user.routes');

const init = async () => {
    sequelize
        .authenticate()
        .then(() => {
            server.route(routes);
        })
        .catch((err) => {
            console.error('Unable to connect to the database:', err);
        });
    await server.start();


    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();