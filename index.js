const { init: makeCachify } = require('connect-cachify-static');
const path = require('node:path');
const debug = require('debug')('postcss:cachify');

const cachifyUrl = require('./lib/cachify');

module.exports = plugin;

async function init(opts) {
  opts.baseUrl ??= '/';
  opts.basePath = opts.basePath ? path.resolve(opts.basePath) : process.cwd();

  if (opts.baseUrl.at(-1) !== '/') {
    opts.baseUrl += '/';
  }

  const store = await makeCachify(opts.basePath, {
    match: opts.match,
    format: opts.format
  });

  debug('Options: %j', opts);

  opts.convertFn = store.cachify;

  return opts;
}

function plugin(opts = {}) {
  let replacementFn;
  return {
    postcssPlugin: 'postcss-cachify',
    async Once() {
      const options = await init(opts);
      replacementFn = cachifyUrl.bind(null, options);
    },
    Declaration(decl) {
      if (decl.value.includes('url(')) {
        decl.value = decl.value.replace(/url\((['"]?)(.+?)['"]?\)/gi, replacementFn);
      }
    }
  };
}

plugin.postcss = true;
