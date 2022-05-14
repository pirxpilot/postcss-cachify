const { readFileSync } = require('fs');
const { resolve } = require('path');
const postcss = require('postcss');
const { expect } = require('chai');

const plugin = require('../');

function assertEqual(input, output, opts) {
  expect(postcss(plugin(opts)).process(input).css).to.eql(output);
}

function loadCss(name) {
  return readFileSync(resolve(__dirname, name), 'utf8');
}

/* global describe, it */

describe('postcss-cachify', function () {

  it('leave non urls untouched', function () {
    assertEqual('a{ }', 'a{ }', {
      basePath: `${__dirname}/fixtures`
    });
  });

  it('process and fix URL declarations', function () {
    const pre = loadCss('fixtures/pre.css');
    const post = loadCss('fixtures/post.css');
    assertEqual(pre, post, {
      basePath: `${__dirname}/fixtures`
    });
  });

});
