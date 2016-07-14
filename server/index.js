/*!
 * inspired by:
 *   http://webapplog.com/http2-node/
 *   http://stackoverflow.com/questions/34693381/add-spdy-http-2-push-methods-to-koa-middleware
 */

const path = require('path');
const fs = require('fs');
const spdy = require('spdy');
const app = require('koa')();
const render = require('koa-ejs');
const forceSSL = require('koa-force-ssl');
const staticCache = require('koa-static-cache');

const router = require('./router');
require('./routeConfig');

const port = 3000;
const keys = require('spdy-keys');
// const keys = {
//     key: fs.readFileSync(path.join(__dirname, '../cert/server.key')),
//     cert: fs.readFileSync(path.join(__dirname, '../cert/server.crt'))
// };

// static
app.use(staticCache(path.join(__dirname, '../static/'), {
        maxAge: 365 * 24 * 60 * 60
    }))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(forceSSL());

render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'html',
    cache: false,
    debug: true
});


// http/2
spdy.createServer(keys, app.callback()).listen(port, (error) => {
    if (error) {
        console.error(error);
        return process.exit(1);
    } else {
        console.log('Listening on port: ' + port + '.');
    }
});
