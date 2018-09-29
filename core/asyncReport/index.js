

function addTag(ctx) {
    ctx._tag = true;
    return ctx;
}

function init() {
    initTag();
}

module.exports = {
    addTag,
    init
}