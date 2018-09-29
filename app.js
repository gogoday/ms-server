const Koa = require('koa');
const app = module.exports = new Koa();
const core = require('./core')
const koaBody = require('koa-body');
const config = require('./config')

global.cm = {};

/**
 * 系统初始化
 */
core.init();

app.use(koaBody());
/**
 * 加载用户cgi
 */
core.cgi(app);

app.listen(config.serverPort);
// module.exports = app;