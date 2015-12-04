// =============================================================================
// Core.js | Strings
// (c) 2015 Mathigon
// =============================================================================



// -----------------------------------------------------------------------------
// String Utilities

export function words(str) {
    return str.trim().split(/\s+/);
}

export function toTitleCase(str) {
    return str.replace(/\S+/g, function(a){
        return a.charAt(0).toUpperCase() + a.slice(1);
    });
}

export function toCamelCase(str) {
    return str.toLowerCase().replace(/^-/,'').replace(/-(.)/g, function(match, g) {
        return g.toUpperCase();
    });
}

export function repeat(str, n = 1) {
	for (let i=1; i<n; ++i) str += str;
	return str;
}

export function padStart(str, maxLength, fillStr = ' ') {
    if (str.length >= maxLength) return str;

    let fillLen = maxLength - str.length;
    let repeats = Math.ceil(fillLen / fillStr.length);

    let start = repeat(fillStr, fillLen).slice(0, fillLen);
    return start + str;
}


// -----------------------------------------------------------------------------
// Templates

const templateFormats = {
    number: function(x) { return x; }
    // TODO more formatting options
};

export function template(str, variables = {}) {
    // TODO check if this works
    return str.replace(/\{\{\s*([a-zA-Z]+)\s*(\|\s*([a-zA-Z]+)\s*)?\}\}/g,
        function(x, val, y, format) {
            let string = variables[val] || '';
            if (format && templateFormats[format]) string = templateFormats[format](string);
            return string;
        });
}
