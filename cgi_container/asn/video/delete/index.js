

module.exports = {
    project: '测试项目',
    desc: '获取列表',
    method: 'post',
    monitor: {
        req: 234234,
        suc: 123123,
        err: 456456
    },
    handle: (ctx, query, body) => {
        
        return 'hello'
    }
}