
// const initAsyncReport = require('./asyncReport')
const routerSvr = require('./router')
// const initService = require('./service')
// const initLib = require('./lib')
// const initAsyncDocs = require('./asyncDocs')

function init() {

    // initAsyncReport.init();

    routerSvr.init();

    // initService();

    // initLib();

    // initAsyncDocs();

}

function configCgi(app) {
    const router = routerSvr.setRoute();
    app.use(router.routes());
}

module.exports = {
    init,
    cgi: configCgi
}