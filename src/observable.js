// =============================================================================
// Core.js | Observable
// (c) 2015 Mathigon
// =============================================================================



export default function observable(model) {

    let obj = {};

    let callbacks = new Map();

    function addItem(name) {
        Object.defineProperty(obj, name, {
            get: function() {
                return model[name];
            },
            set: function(value) {
                if (model[name] === value) return;
                model[name] = value;
                callbacks.get(name).forEach(c => { c(model[name]); });
            },
            enumerable: true,
            configurable: true
        });
    }

    for (let item in model) addItem(item);

    Object.defineProperty(obj, 'watch', {
        value: function(item, callback) {
            if (!callbacks.has(item)) callbacks.set(item, []);
            callbacks.get(item).push(callback);
            callback(model[item]);
        },
        enumerable: false,
        configurable: false
    });

    Object.defineProperty(obj, 'unwatch', {
        value: function(item, callback) {
            if (callbacks.has(item)) {
                let filtered = callbacks.set(item).filter(c => c !== callback);
                callbacks.set(item, filtered);
            }
        },
        enumerable: false,
        configurable: false
    });

    return obj;
}

/* TODO this needs browser support for proxies

function Observable(object = {}) {

    let events = new Evented();

    return new Proxy(object, {
        get: function(obj, key) {
            if (key == 'watch')   return events.on.bind(events);
            if (key == 'unwatch') return events.off.bind(events);
            if (key == 'source')  return object;
            return obj[key];
        },
        set: function(obj, key, value) {
            if (obj[key] == value) return;
            if (key === 'watch' || key === 'unwatch') return;

            obj[key] = value;
            events.trigger(key, value);
        }
    });
} */
