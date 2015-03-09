module.exports = onValue;

function onValue(value) {
    return value.replace(/url\((['"])([^'"]+)['"]\)/gi, processUrl);
}


function processUrl(match, quote, url) {
    // console.log("found:", url);
    return ['url(', quote, url, quote, ')'].join('');
}