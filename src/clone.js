// =================================================================================================
// Tesla.js | Clone, Copy and Equals
// (c) 2014 Mathigon / Philipp Legner
// =================================================================================================


(function() {

    // ---------------------------------------------------------------------------------------------
    // Copy

    M.shallowCopy = function(obj) {
        // TODO
    };

    M.deepCopy = function(obj) {
        // TODO
    };


    // ---------------------------------------------------------------------------------------------
    // Equals

    M.shallowEquals = function(obj1, obj2) {

    };

    M.deepEquals = function(obj1, obj2) {

    };

})();



/*

exports.clone = function clone(x) {
  var type = typeof x;

  // immutable primitive types
  if (type === 'number' || type === 'string' || type === 'boolean' ||
      x === null || x === undefined) {
    return x;
  }

  // use clone function of the object when available
  if (typeof x.clone === 'function') {
    return x.clone();
  }

  // array
  if (Array.isArray(x)) {
    return x.map(function (value) {
      return clone(value);
    });
  }

  if (x instanceof Number)  return new Number(x.valueOf());
  if (x instanceof String)  return new String(x.valueOf());
  if (x instanceof Boolean) return new Boolean(x.valueOf());
  if (x instanceof Date)    return new Date(x.valueOf());
  if (x instanceof RegExp)  throw new TypeError('Cannot clone ' + x);  // TODO: clone a RegExp

  // object
  var m = {};
  for (var key in x) {
    if (x.hasOwnProperty(key)) {
      m[key] = clone(x[key]);
    }
  }
  return m;
};




exports.deepEqual = function deepEqual (a, b) {
  var prop, i, len;
  if (Array.isArray(a)) {
    if (!Array.isArray(b)) {
      return false;
    }

    if (a.length != b.length) {
      return false;
    }

    for (i = 0, len = a.length; i < len; i++) {
      if (!exports.deepEqual(a[i], b[i])) {
        return false;
      }
    }
    return true;
  }
  else if (a instanceof Object) {
    if (Array.isArray(b) || !(b instanceof Object)) {
      return false;
    }

    for (prop in a) {
      //noinspection JSUnfilteredForInLoop
      if (!exports.deepEqual(a[prop], b[prop])) {
        return false;
      }
    }
    for (prop in b) {
      //noinspection JSUnfilteredForInLoop
      if (!exports.deepEqual(a[prop], b[prop])) {
        return false;
      }
    }
    return true;
  }
  else {
    return (typeof a === typeof b) && (a == b);
  }
};



M.deepCopy = function clone(obj) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (M.isDate(obj)) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (M.isArray(obj)) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = clone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};

M.shallowCopy

var deepEqualsHelper = function(a, b) {
    if (a === b) {
        return true;

    } else if ( a === null || b === null || typeof a === "undefined" || typeof b === "undefined"
            || M.typeOf(a) !== M.typeOf(b) ) {
        return false;

    } else {
        return bindCallbacks( a, callbacks, [ b, a ] );
    }
};


M.deepEquals = function deepEq(obj1, obj2) {  // can take >2 arguments

    var args = [].slice.apply( arguments );
    if (args.length < 2) return true;

    var a = args[0];
    var b = args[1];

    return ( (function( a, b ) {

        // apply transition with (1..n) arguments
    }( args[ 0 ], args[ 1 ] ) ) && deepEq.apply( this, args.splice( 1, args.length - 1 ) ) );

};







    // Call the o related callback with the given arguments.
    function bindCallbacks( o, callbacks, args ) {
        var prop = QUnit.objectType( o );
        if ( prop ) {
            if ( QUnit.objectType( callbacks[ prop ] ) === "function" ) {
                return callbacks[ prop ].apply( callbacks, args );
            } else {
                return callbacks[ prop ]; // or undefined
            }
        }
    }



        // stack to decide between skip/abort functions
        callers = [],

        // stack to avoiding loops from circular referencing
        parents = [],
        parentsB = [],

        getProto = Object.getPrototypeOf || function( obj ) {
            return obj.__proto__;
        },
        callbacks = (function() {

            // for string, boolean, number and null
            function useStrictEquality( b, a ) {

                if ( b instanceof a.constructor || a instanceof b.constructor ) {

                    // to catch short annotation VS 'new' annotation of a
                    // declaration
                    // e.g. var i = 1;
                    // var j = new Number(1);
                    return a == b;
                } else {
                    return a === b;
                }
            }

            return {
                "string": useStrictEquality,
                "boolean": useStrictEquality,
                "number": useStrictEquality,
                "null": useStrictEquality,
                "undefined": useStrictEquality,

                "nan": function( b ) {
                    return isNaN( b );
                },

                "date": function( b, a ) {
                    return QUnit.objectType( b ) === "date" && a.valueOf() === b.valueOf();
                },

                "regexp": function( b, a ) {
                    return QUnit.objectType( b ) === "regexp" &&

                        // the regex itself
                        a.source === b.source &&

                        // and its modifiers
                        a.global === b.global &&

                        // (gmi) ...
                        a.ignoreCase === b.ignoreCase &&
                        a.multiline === b.multiline &&
                        a.sticky === b.sticky;
                },

                // - skip when the property is a method of an instance (OOP)
                // - abort otherwise,
                // initial === would have catch identical references anyway
                "function": function() {
                    var caller = callers[ callers.length - 1 ];
                    return caller !== Object && typeof caller !== "undefined";
                },

                "array": function( b, a ) {
                    var i, j, len, loop, aCircular, bCircular;

                    // b could be an object literal here
                    if ( QUnit.objectType( b ) !== "array" ) {
                        return false;
                    }

                    len = a.length;
                    if ( len !== b.length ) {
                        // safe and faster
                        return false;
                    }

                    // track reference to avoid circular references
                    parents.push( a );
                    parentsB.push( b );
                    for ( i = 0; i < len; i++ ) {
                        loop = false;
                        for ( j = 0; j < parents.length; j++ ) {
                            aCircular = parents[ j ] === a[ i ];
                            bCircular = parentsB[ j ] === b[ i ];
                            if ( aCircular || bCircular ) {
                                if ( a[ i ] === b[ i ] || aCircular && bCircular ) {
                                    loop = true;
                                } else {
                                    parents.pop();
                                    parentsB.pop();
                                    return false;
                                }
                            }
                        }
                        if ( !loop && !innerEquiv( a[ i ], b[ i ] ) ) {
                            parents.pop();
                            parentsB.pop();
                            return false;
                        }
                    }
                    parents.pop();
                    parentsB.pop();
                    return true;
                },

                "object": function( b, a ) {

                    var i, j, loop, aCircular, bCircular,
                        // Default to true
                        eq = true,
                        aProperties = [],
                        bProperties = [];

                    // comparing constructors is more strict than using
                    // instanceof
                    if ( a.constructor !== b.constructor ) {

                        // Allow objects with no prototype to be equivalent to
                        // objects with Object as their constructor.
                        if ( !( ( getProto( a ) === null && getProto( b ) === Object.prototype ) ||
                            ( getProto( b ) === null && getProto( a ) === Object.prototype ) ) ) {
                            return false;
                        }
                    }

                    // stack constructor before traversing properties
                    callers.push( a.constructor );

                    // track reference to avoid circular references
                    parents.push( a );
                    parentsB.push( b );

                    // be strict: don't ensure hasOwnProperty and go deep
                    for ( i in a ) {
                        loop = false;
                        for ( j = 0; j < parents.length; j++ ) {
                            aCircular = parents[ j ] === a[ i ];
                            bCircular = parentsB[ j ] === b[ i ];
                            if ( aCircular || bCircular ) {
                                if ( a[ i ] === b[ i ] || aCircular && bCircular ) {
                                    loop = true;
                                } else {
                                    eq = false;
                                    break;
                                }
                            }
                        }
                        aProperties.push( i );
                        if ( !loop && !innerEquiv( a[ i ], b[ i ] ) ) {
                            eq = false;
                            break;
                        }
                    }

                    parents.pop();
                    parentsB.pop();
                    callers.pop(); // unstack, we are done

                    for ( i in b ) {
                        bProperties.push( i ); // collect b's properties
                    }

                    // Ensures identical properties name
                    return eq && innerEquiv( aProperties.sort(), bProperties.sort() );
                }
            };
        }());



*/
