var cachify = require('./lib/cachify');

module.exports = function (opts) {
    opts = opts || {};

    // Work with options here

    return function (css) {

	    css.eachDecl(function(decl) {
	      if (!decl.value) {
	        return;
	      }

	      if (decl.value.indexOf('url(') > -1) {
	        cachify(decl, opts);
	      }
	    });
    };
};
module.exports.postcss = function (css) {
    return module.exports()(css);
};
