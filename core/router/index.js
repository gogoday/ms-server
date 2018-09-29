
const path = require('path')
const util = require('../../libs')
const config = require('../../config')
const Router = require('koa-router');
const router = new Router();

const routes = [];

function init() {
    const files = util.readDir(config.cgiPath, config.ignore, config.ext)

    if (files) {
        files.forEach(item => {
            let cgiConf = require(item)
            let rpath = path.relative(config.cgiPath, item)
            if (typeof cgiConf.handle === 'function') {
                
                rpath = rpath.replace('index.js', '')
                rpath = rpath.replace('.js', '')
                rpath = '/cm-cgi/' + rpath;

                routes.push({
                    route: rpath,
                    fun: cgiConf.handle,
                    config: cgiConf
                })
            }
        })
    }

    global.cm.cgi = routes;
    // console.log(routes)
    getTimeout(() => {
        console.log(global.cm.cgi);
    }, 2000)
}

function setRoute() {
    routes.forEach(item => {
        console.log(item)
        router[item.config.method](item.route, ctx => {
            let method = item.config.method;
            let ctxBody;
            if (method === 'get') {
                ctxBody = item.fun(ctx, ctx.query);
            } else if (method === 'post') {
                const reqBody = ctx.request.body;
                ctxBody = item.fun(ctx, reqBody);
            } else {
                const reqBody = ctx.request.body;
                ctxBody = item.fun(ctx, ctx.query, reqBody);
            }
            if (ctxBody) {
                ctx.body = ctxBody;
            }
        });
    })
    return router;
}

if (process.mainModule === module) {
    init();
    console.log(routes);
} else {
    module.exports = {
        init,
        setRoute
    }
}
