var fs  = require('fs');
var resolve  = require('path').resolve;
var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, opts) {
    expect(postcss(plugin(opts)).process(input).css).to.eql(output);
};

function loadCss(name) {
    return fs.readFileSync(resolve(__dirname, name), 'utf8');
}

/* global describe, it */

describe('postcss-cachify', function () {

    it('leave non urls untouched', function () {
        test('a{ }', 'a{ }', {
            basePath: __dirname + '/fixtures'
        });
    });

    it('process and fix URL declarations', function () {
        var pre = loadCss('fixtures/pre.css');
        var post = loadCss('fixtures/post.css');
        test(pre, post, {
            basePath: __dirname + '/fixtures'
        });
    });

});
