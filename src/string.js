// =============================================================================
// Core.js | Strings
// (c) 2015 Mathigon
// =============================================================================



// -----------------------------------------------------------------------------
// String Utilities

function words(str) {
    return str.trim().split(/\s+/);
}

function toTitleCase(str) {
    return str.replace(/\S+/g, function(a){
        return a.charAt(0).toUpperCase() + a.slice(1);
    });
}

function toCamelCase(str) {
    return str.toLowerCase().replace(/^-/,'').replace(/-(.)/g, function(match, g) {
        return g.toUpperCase();
    });
}


// -----------------------------------------------------------------------------
// Templates

const templateFormats = {
    number: function(x) { return x; }
    // TODO more formatting options
}

function template(template, variables = {}) {
    // TODO check if this works
    return template.replace(/\{\{\s*([a-zA-Z]+)\s*(\|\s*([a-zA-Z]+)\s*)?\}\}/g,
        function(x, val, y, format) {
            let string = variables[val] || '';
            if (format && templateFormats[format]) string = templateFormats[format](string);
            return string;
        });
}

// -----------------------------------------------------------------------------

export default { words, toTitleCase, toCamelCase, template };

