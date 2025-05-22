const { describe, it } = require('node:test');
const { readFile } = require('node:fs').promises;
const { resolve } = require('node:path');
const postcss = require('postcss');

const plugin = require('../');

async function process(input, opts) {
  const processor = postcss(plugin(opts));
  const { css } = await processor.process(input, { from: undefined });
  return css;
}

function loadCss(name) {
  return readFile(resolve(__dirname, name), 'utf8');
}

/* global describe, it */

describe('postcss-cachify', () => {
  it('leave non urls untouched', async t => {
    const css = await process('a{ }', {
      basePath: `${__dirname}/fixtures`
    });
    t.assert.equal(css, 'a{ }');
  });

  it('process and fix URL declarations', async t => {
    const [pre, post] = await Promise.all(['fixtures/pre.css', 'fixtures/post.css'].map(loadCss));
    const css = await process(pre, {
      basePath: `${__dirname}/fixtures`
    });
    t.assert.equal(css, post);
  });
});
