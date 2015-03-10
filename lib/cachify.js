var url = require('url');
var debug = require('debug')('postcss:cachify');

module.exports = processUrl;

function processUrl(opts, match, quote, value) {
    var parsed = url.parse(value);
    var converted = value;
    if (!parsed.protocol || !parsed.host) {
        // only change local URLs
        parsed.pathname = cachifyPath(parsed.pathname, opts);
        converted = url.format(parsed);
        debug('Converted %s to %s', value, converted);
    }
    return ['url(', quote, converted, quote, ')'].join('');
}


function cachifyPath(path, opts) {
    var absolute = (path[0] === '/') ?
        path :
        opts.baseUrl + path;


    var hashed = opts.convertFn(absolute);

    // only return a new value id we actually changed something
    return hashed !== absolute ? hashed : path;
}


