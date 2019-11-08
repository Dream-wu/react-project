const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        proxy(
            '/login', {
                target: 'http://sposter.net/',
                changeOrigin: true
            }
        )
    );
};