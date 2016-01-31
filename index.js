var cachify = require('connect-cachify-static');
var path = require('path');
var debug = require('debug')('postcss:cachify');
var postcss = require('postcss');

var cachifyUrl = require('./lib/cachify');

module.exports = postcss.plugin('postcss-cachify', postcssCachify);

function postcssCachify (opts) {
    opts = opts || {};
    opts.baseUrl = opts.baseUrl || '/';
    opts.basePath = opts.basePath ?
        path.resolve(opts.basePath) :
        process.cwd();

    if (opts.baseUrl[opts.baseUrl.length - 1] !== '/') {
        opts.baseUrl += '/';
    }

    cachify.init(opts.basePath, {
        match: opts.match,
        format: opts.format
    });

    debug('Options: %j', opts);

    opts.convertFn = cachify.cachify;

    return function (css) {
        css.replaceValues(/url\((['"]?)(.+?)['"]?\)/gi, {
            fast: 'url('
        }, cachifyUrl.bind(null, opts));
    };
}

