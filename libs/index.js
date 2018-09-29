const fs = require('fs')
const path = require('path')

/**
 * 读取某个目录中的文件以及自文件夹的文件列表
 * @param {string} _path 文件夹路径
 * @param {array} ignore 排除的关键字
 * @param {array} ext 文件拓展名
 */
function readDir(_path, ignore, ext) {
    const fileList = []
    function work(_path) {
        const list = fs.readdirSync(_path)
        
        list.forEach(item => {
            let filePath = path.resolve(_path, item);
            let stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                work(filePath)
            } else if (stat.isFile()) {

                let noMatch = true;
                ignore.forEach(item => {
                    if (filePath.indexOf(item) > -1) {
                        noMatch = false;
                    }
                })

                let hasExt = false;
                ext.forEach(item => {
                    if (new RegExp(`^.*${item}$`).test(filePath))  hasExt = true;
                })

                if (noMatch && hasExt) 
                fileList.push(filePath);
                
            }
        })
    }
    work(_path);
    return fileList;
}

/**
 * 获取cgi文件的配置信息 注释方式的配置
 * @param {string} filePath 文件路径
 */
function getCgiConfig (filePath) {
    let obj = {}
    let reg = {
      method: /method:\s*\[([^\]]+)\]/,
      rmonitor_suc: /monitor_suc:\s*\[(\d+)\]/,
      monitor_err: /monitor_err:\s*\[(\d+)\]/,
      projec: /project:\s*(.*)/,
      desc: /desc:\s*(.*)/
    }
    let match = null;

    let content = fs.readFileSync(filePath, 'utf8');
    // console.log(content)
    for(let i in reg) {
        // console.log(reg[i])
        match = content.match(reg[i]);

        if (match) {
            obj[i] = match[1];
        } else {
            throw new Error(`cgi file: ${filePath} no config item: ${i}`);
            return false;
        }
    }

    return obj

}

if (process.mainModule === module) {
    console.log(readDir('../', ['node_modules'], ['\.js']))
    console.log(getCgiConfig('/Users/sampsonwang/workspace/ms/ms_server/cgi_container/asn/video/delete/index.js'))
} else {
    module.exports = {
        readDir,
        getCgiConfig
    }
}
