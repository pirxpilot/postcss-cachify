[![Build Status](https://img.shields.io/travis/code42day/postcss-cachify.svg)](http://travis-ci.org/code42day/postcss-cachify)
[![Dependency Status](https://img.shields.io/gemnasium/code42day/postcss-cachify.svg)](https://gemnasium.com/code42day/postcss-cachify)
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

## Usage

```js
postcss([ require('postcss-cachify') ])
```

See [PostCSS] docs for examples for your environment.

[PostCSS]: https://github.com/postcss/postcss
[connect-cachify-static]: https://github.com/code42day/connect-cachify-static