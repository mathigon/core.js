// =================================================================================================
// Tesla.js | String Functions
// (c) 2014 Mathigon / Philipp Legner
// =================================================================================================


(function() {

    M.string = {};

    M.string.endsWith = function(text, search) {
        var start = text.length - search.length;
        var end = text.length;
        return (text.substring(start, end) === search);
    };

    M.string.strip = function(str) {
        return str.replace(/^\s+/, '').replace(/\s+$/, '');
    };

    M.string.collapse = function(str) {
        return str.trim().replace(/\s+/g, ' ');
    };

    M.string.toTitleCase = function(str) {
        return str.replace(/\S+/g, function(a){
            return a.charAt(0).toUpperCase() + a.slice(1);
        });
    };

    M.string.words = function(str) {
        return str.strip().split(/\s+/);
    };

})();
