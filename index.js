const cachify = require('connect-cachify-static');
const path = require('path');
const debug = require('debug')('postcss:cachify');

const cachifyUrl = require('./lib/cachify');

module.exports = plugin;

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

function plugin(opts = {}) {
  opts = init(opts);
  const replacementFn = cachifyUrl.bind(null, opts);
  return {
    postcssPlugin: 'postcss-cachify',
    Declaration(decl) {
      if (decl.value.includes('url(')) {
        decl.value = decl.value.replace(/url\((['"]?)(.+?)['"]?\)/gi, replacementFn);
      }
    }
  };
}

plugin.postcss = true;

