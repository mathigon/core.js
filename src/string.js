// =================================================================================================
// Tesla.js | String Functions
// (c) 2014 Mathigon / Philipp Legner
// =================================================================================================


(function() {

    M.extend(String.prototype, {

        endsWith: function(search) {
            var end = this.length;
            var start = end - search.length;
            return (this.substring(start, end) === search);
        },

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
        }

    }, true);

    if ( !String.prototype.contains ) {
        M.extend(String.prototype, {

            contains: function() {
                return String.prototype.indexOf.apply( this, arguments ) !== -1;
            }
        }, true);
    }

})();
