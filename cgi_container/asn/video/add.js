module.exports = {
    project: '测试项目b',
    desc: '获取列表b',
    method: 'get',
    monitor: {
        req: 234234,
        suc: 123123,
        err: 456456
    },
    handle: (ctx, query, body) => {
        
        return 'aaaaa'
    }
}