## Promises


### promise.defer
`M.promise.defer() : Deferred`

### promise.timeout
`M.promise.timeout() : Deferred`

### promise.all
`M.promise.all() : Deferred`

### promise.resolve
`M.promise.resolve() : Deferred`

### promise.reject
`M.promise.reject() : Deferred`


### Deferred

#### Methods

`.then()`  

`.catch()`  

`.complete()`  

`.resolve()`  

`.reject()`  

#### Events

Note: always use `.resolve()` rather than `.trigger('resolve')` to resolve (or reject) promises.

`.on('resolve')`  

`.on('reject')`  
x