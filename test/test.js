const { readFile } = require('fs').promises;
const { resolve } = require('path');
const postcss = require('postcss');
const { expect } = require('chai');

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

describe('postcss-cachify', function () {

  it('leave non urls untouched', async function () {
    const css = await process('a{ }', {
      basePath: `${__dirname}/fixtures`
    });
    expect(css).to.eql('a{ }');
  });

  it('process and fix URL declarations', async function () {
    const [pre, post] = await Promise.all(['fixtures/pre.css', 'fixtures/post.css'].map(loadCss));
    const css = await process(pre, {
      basePath: `${__dirname}/fixtures`
    });
    expect(css).to.eql(post);
  });

});
