[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][deps-image]][deps-url]
[![Dev Dependency Status][deps-dev-image]][deps-dev-url]

# PostCSS Cachify

[PostCSS] plugin to replace assets urls with cachified versions. Companion for [connect-cachify-static] - rewritten URLs allow for long cache expiration and reliable cache busting for resources referenced in CSS files.


```css
.cachified-relative {
  background-image: url('/image.png');
}

.cachified-absolute {
  background-image: url('image.png');
}
```

```css
.cachified-relative {
  background-image: url('/97ea519347/image.png');
}

.cachified-absolute {
  background-image: url('/97ea519347/image.png');
}
```

## Options

- `baseUrl` - defaults to `/` - used to convert relative URLs to absolute URLs
- `basePath` - location of files that will be cachified - defaults to current working directory
- `match` - regular expression used to filter out files that will be considered for cachifying - defaults to `/\.(svg|eot|woff|ttf|png|gif|jpg)$/`
- `format` - `name`, `path` or function converting `path` and `hash` prefix into cachified name - defaults to `path`

## Usage

```js
postcss([ require('postcss-cachify') ]);
```

See [PostCSS] docs for examples for your environment.

[PostCSS]: https://github.com/postcss/postcss
[connect-cachify-static]: https://github.com/pirxpilot/connect-cachify-static

[npm-image]: https://img.shields.io/npm/v/postcss-cachify.svg
[npm-url]: https://npmjs.org/package/postcss-cachify

[travis-url]: https://travis-ci.org/pirxpilot/postcss-cachify
[travis-image]: https://img.shields.io/travis/pirxpilot/postcss-cachify.svg

[deps-image]: https://img.shields.io/david/pirxpilot/postcss-cachify.svg
[deps-url]: https://david-dm.org/pirxpilot/postcss-cachify

[deps-dev-image]: https://img.shields.io/david/dev/pirxpilot/postcss-cachify.svg
[deps-dev-url]: https://david-dm.org/pirxpilot/postcss-cachify?type=dev
