var cachify = require('./lib/cachify');

module.exports = function (opts) {
    opts = opts || {};

    // Work with options here

    return function (css) {
        css.replaceValues(/url\(.+\)/, {
            fast: 'url('
        }, function(v) {
            return cachify(v, opts);
        });
    };
};

module.exports.postcss = function (css) {
    return module.exports()(css);
};
