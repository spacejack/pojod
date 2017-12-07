# POJOD

A minimalist Plain Old Javscript Object Dictionary utility.

Useful when using plain objects as dictionaries in Javascript and Typescript. Also supplements Typescript's `Record<K,V>` object type.

This library does not attempt to replicate the functionality of libraries like lodash or ramda, nor does it intend to be a substitute for ES6 `Map`. It is a small (1KB minified) utility that smooths some of the rough edges when working with plain objects and types.

## Install

    npm i pojod

*Typescript types are included.*

## Usage

    import D from 'pojod'

The default export can be used as a type and a factory function. It also provides some static helper functions as properties.

The generic type `D<T>` can be used as a shorthand alias for `{[id: string]: T}`.

The factory function `D` always returns a plain JS object *without* a prototype by using `Object.create(null)`.

Helper functions (`D.isEmpty`, `D.size`, `D.has`, etc.) are safe to use on objects with or without prototypes. Only the object's *own* properties are considered. Properties on the prototype chain are ignored.

```typescript
import D from 'pojod'
// var D = require('pojod').default

// Create an empty dictionary object without a prototype having any values.
const d = D() // Equivalent to const d: {[id: string]: any} = Object.create(null)

// Create an empty dictionary object without a prototype having string values.
const d = D<string>() // Equivalent to const d: {[id: string]: string} = Object.create(null)

// Create an empty Record object without a prototype and typed keys
const d = D<'a' | 'b', number>() // Equivalent to const d: Record<'a' | 'b', number> = Object.create(null)

// Create a Record object without a prototype having typed keys from another object.
// (Only the source object's own properties will be copied.)
const d = D({a: 1, b: 2}) // d: Record<'a' | 'b', number>

// Create a dictionary with string keys from another object (allows adding arbitrary keys)
const d = D<number>({a: 1, b: 2}) // d: {[id: string]: number}

// Create a dictionary object from a Map (the map must have string keys)
const m = new Map<string, number>()
m.set('a', 1)
const d = D(m) // {a: 1}

// Create a Record from a Map with typed keys (map keys must extend string)
const m = new Map<'a' | 'b', number>()
m.set('a', 1)
m.set('b', 2)
const d = D(m) // {a: 1, b: 2}

// Check if object is empty (excluding prototype)
D.isEmpty({}) // true

// Count (own) keys in object (excluding prototype)
D.size({a: 1, b: 2}) // 2

// Shorthand for Object.prototype.hasOwnProperty.call
// (Safe to use on objects lacking a prototype)
D.has({a: 1}, 'b') // false

// Find first key having value (like Array indexOf)
D.keyOf({a: 1, b: 2}, 1) // 'a'

// Return the nth key
D.keyAt({a: true, b: false}, 1) // 'b'

// Return the first key
D.firstKey({a: 1, b: 2}) // 'a'

// Return the last key
D.lastKey({a: 1, b: 2}) // 'b'

// Return typed keys
D.keys({a: 1, b: 2}) // array with elements of type 'a' | 'b'

// Iterate through typed keys of an object
const d = {a: 1, b: 2}
D.keys(d).forEach(k => {
    console.log(d[k]) // type checks ok
})

// Convert object to Map
const m = D.toMap({a: 1, b: 2})

// Invert keys and values
const d = {a: 'x', b: 'y'}
const dr = D.invert(d) // {x: 'a', y: 'b'}

// Clear all (own) properties
const d = D<number>({a: 1, b: 2})
D.clear(d) // {}

// D can be used as a shorthand alias for type {[id: string]: T}
const d: D<number> = {}
d.a = 1
```

## Compatibility

Requires support for `Object.create` and `Object.keys`, so IE9 and up. Converting to and from Maps requires `Map` support. You will need to provide polyfills if targeting older browsers.

Performance-wise, **pojod** favours modern browsers where `Object.keys` is as fast as or faster than `for…in` loops.

## Caveats

Beware of relying on type inference when using the factory function on (typed) objects having properties on the prototype chain. For example:

```typescript
const d = D(new Date())
```

Will result in a `Record<K,V>` type with all of the prototype property names in the key (`K`) type, however those properties will not be copied to the resulting object.
