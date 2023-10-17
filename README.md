[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

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

[npm-image]: https://img.shields.io/npm/v/postcss-cachify
[npm-url]: https://npmjs.org/package/postcss-cachify

[build-url]: https://github.com/pirxpilot/postcss-cachify/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/postcss-cachify/check.yaml?branch=main
 
[deps-image]: https://img.shields.io/librariesio/release/npm/postcss-cachify
[deps-url]: https://libraries.io/npm/postcss-cachify
