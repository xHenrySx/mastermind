const auth = require('./tools/auth-middleware');
const bodyParser = require('body-parser');

function setupMiddlewares (app) {
    app.use(bodyParser.json());
    auth.init();
    app.use(auth.protectWithJwt);
}

exports.setupMiddlewares = setupMiddlewares;
