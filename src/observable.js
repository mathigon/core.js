// =============================================================================
// Core.js | Observable
// (c) 2015 Mathigon
// =============================================================================



export default function observable(model) {

    let obj = {};

    let timeouts = new Map();
    let callbacks = new Map();

    function addItem(name) {
        Object.defineProperty(obj, name, {
            get: function() {
                return model[name];
            },
            set: function(value) { 
                if (model[name] === value) return;
                model[name] = value;

                // The update event is called asynchronously to avoid it being
                // called multiple times during the same thread
                window.clearTimeout(timeouts.get(name));
                let callbacks = callbacks.get(name);
                if (callbacks) {
                    timeouts.set(name, window.setTimeout(function() {
                        callbacks.forEach(c => { c(model[name]); });
                    }));
                }
            },
            enumerable: true,
            configurable: true
        });
    }

    for (let item in model) addItem(item);

    Object.defineProperty(obj, 'watch', {
        value: function(item, callback) {
            if (!callbacks.has(item)) callbacks.set('item', []);
            callbacks.get('item').push(callback);
            callback(model[item]);
        },
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(obj, 'unwatch', {
        value: function(item, callback) {
            if (callbacks.has(item)) {
                let filtered = callbacks.set('item').filter(c => c !== callback);
                callbacks.set('item', filtered);
            }
        },
        enumerable: false,
        configurable: false
    });

    return obj;
}
