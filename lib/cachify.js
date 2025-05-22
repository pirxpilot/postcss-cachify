const url = require('node:url');
const debug = require('debug')('postcss:cachify');

module.exports = processUrl;

function processUrl(opts, _match, quote, value) {
  const parsed = url.parse(value);
  let converted = value;
  if (!parsed.protocol || !parsed.host) {
    // only change local URLs
    parsed.pathname = cachifyPath(parsed.pathname, opts);
    converted = url.format(parsed);
    debug('Converted %s to %s', value, converted);
  }
  return `url(${quote}${converted}${quote})`;
}

function cachifyPath(path, { convertFn, baseUrl }) {
  const absolute = path[0] === '/' ? path : baseUrl + path;

  const hashed = convertFn(absolute);

  // only return a new value id we actually changed something
  return hashed !== absolute ? hashed : path;
}
