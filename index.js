const cachify = require('connect-cachify-static');
const path = require('path');
const debug = require('debug')('postcss:cachify');
const postcss = require('postcss');

const cachifyUrl = require('./lib/cachify');

module.exports = postcss.plugin('postcss-cachify', postcssCachify);

function init(opts = {}) {
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

  return opts;
}

function postcssCachify(opts) {
  let options;

  return css => {
    if (!options) {
      options = init(opts);
    }
    css.replaceValues(/url\((['"]?)(.+?)['"]?\)/gi, {
      fast: 'url('
    }, cachifyUrl.bind(null, options));
  };
}

