// =================================================================================================
// Core.js | String Functions
// (c) 2015 Mathigon / Philipp Legner
// =================================================================================================


(function() {

    M.extendPrototype(String, {
        strip: function() {
            return this.replace(/^\s+/, '').replace(/\s+$/, '');
        },

        collapse: function() {
            return this.trim().replace(/\s+/g, ' ');
        },

        toTitleCase: function() {
            return this.replace(/\S+/g, function(a){
                return a.charAt(0).toUpperCase() + a.slice(1);
            });
        },

        words: function() {
            return this.strip().split(/\s+/);
        },

        endsWith: function(search) {
            var end = this.length;
            var start = end - search.length;
            return (this.substring(start, end) === search);
        },

        contains: function() {
            return String.prototype.indexOf.apply( this, arguments ) !== -1;
        }
    });

    // TODO mroe formatting options
    var templateFormats = {
        number: function(x) { return x; }
    };

    M.template = function(template, variables) {
        if (!variables) variables = {};
        return template.replace(/\{\{\s*([a-zA-Z]+)\s*(\|\s*([a-zA-Z]+)\s*)?\}\}/g,
            function(x, val, y, format) {
                console.log(val, format);
                var string = variables[val] || '';
                if (format && templateFormats[format]) string = templateFormats[format](string);
                return string;
            });
    };

})();
