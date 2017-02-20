[![Build Status](https://img.shields.io/travis/pirxpilot/postcss-cachify.svg)](http://travis-ci.org/pirxpilot/postcss-cachify)
[![Dependency Status](https://img.shields.io/gemnasium/pirxpilot/postcss-cachify.svg)](https://gemnasium.com/pirxpilot/postcss-cachify)
[![NPM version](https://img.shields.io/npm/v/postcss-cachify.svg)](http://badge.fury.io/js/postcss-cachify)

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
postcss([ require('postcss-cachify') ])
```

See [PostCSS] docs for examples for your environment.

[PostCSS]: https://github.com/postcss/postcss
[connect-cachify-static]: https://github.com/pirxpilot/connect-cachify-static
