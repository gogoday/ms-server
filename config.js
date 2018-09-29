const path = require('path')

module.exports = {
    basePath: path.resolve(__dirname, './'),
    cgiPath: path.resolve(__dirname, 'cgi_container'),
    ignore: ['node_modules'],
    ext: ['\.js'],
    serverPort: 8081
}