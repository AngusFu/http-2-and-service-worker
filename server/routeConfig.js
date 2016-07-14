const path = require('path');
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require('fs'));

const router = require('./router');

router.get('/index', function *(next) {
    this.set('Content-Type', 'text/html;charset=utf-8');
    this.status = 200;
    var imgs = yield fs.readdirAsync(path.join(__dirname, '../static/images/'));
    yield this.render('index', {imgs: imgs});
});

// router.get('/sw.js', function *(next) {
//     if (this.fresh) {
//       this.status = 304;
//       return;
//     }

//     this.set('Content-Type', 'application/javascript;charset=utf-8');
//     this.set('Cache-Control', 'max-age=2000000000000');
//     this.body = yield fs.readFileAsync(path.join(__dirname, '../static/scripts/sw.js'));
// });
