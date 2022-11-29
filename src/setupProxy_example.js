const { createProxyMiddleware } = require('http-proxy-middleware');

const root = 'http://localhost:3000'

module.exports = function(app) {
    app.use(
        '/loki',
        createProxyMiddleware({
            target: root,
            changeOrigin: true,
        })
    );
    app.use(
        '/api',
        createProxyMiddleware({
            target: root,
            changeOrigin: true,
        })
    );
    app.use(
        '/tempo',
        createProxyMiddleware({
            target: root,
            changeOrigin: true,
        })
    );
};