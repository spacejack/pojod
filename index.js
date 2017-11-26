"use strict";
// pojod
// Typed object dictionary helpers
// (c) 2017 by Mike Linkovich
// https://www.github.com/spacejack/pojod
// License: ISC
Object.defineProperty(exports, "__esModule", { value: true });
function create(o) {
    var d = Object.create(null);
    if (o) {
        if (typeof Map !== 'undefined' && o instanceof Map) {
            o.forEach(function (v, k) {
                d[k] = v;
            });
        }
        else {
            var keys_1 = Object.keys(o);
            var k = void 0;
            for (var i = 0; i < keys_1.length; ++i) {
                k = keys_1[i];
                if (has(o, k))
                    d[k] = o[k];
            }
        }
    }
    return d;
}
function isEmpty(d) {
    return Object.keys(d).length === 0;
}
function size(d) {
    return Object.keys(d).length;
}
function has(d, k) {
    return Object.prototype.hasOwnProperty.call(d, k);
}
function keyOf(d, v) {
    var keys = Object.keys(d);
    var i;
    var k;
    for (i = 0; i < keys.length; ++i) {
        k = keys[i];
        if (d[k] === v)
            return k;
    }
    return undefined;
}
function keyAt(d, i) {
    return Object.keys(d)[i];
}
function firstKey(d) {
    return Object.keys(d)[0];
}
function lastKey(d) {
    var ks = Object.keys(d);
    return ks.length > 0 ? ks[ks.length - 1] : undefined;
}
function keys(d) {
    return Object.keys(d);
}
function toMap(r) {
    var m = new Map();
    Object.keys(r).forEach(function (k) {
        m.set(k, r[k]);
    });
    return m;
}
function clear(d) {
    Object.keys(d).forEach(function (k) {
        delete d[k];
    });
    return d;
}
var D = create;
D.isEmpty = isEmpty;
D.size = size;
D.has = has;
D.keyOf = keyOf;
D.keyAt = keyAt;
D.firstKey = firstKey;
D.lastKey = lastKey;
D.keys = keys;
D.toMap = toMap;
D.clear = clear;
exports.default = D;
