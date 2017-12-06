"use strict";
// pojod
// Typed object dictionary helpers
// (c) 2017 by Mike Linkovich
// https://www.github.com/spacejack/pojod
// License: ISC
Object.defineProperty(exports, "__esModule", { value: true });
var keys = Object.keys;
function create(o) {
    var d = Object.create(null);
    if (o) {
        if (typeof Map !== 'undefined' && o instanceof Map) {
            o.forEach(function (v, k) {
                d[k] = v;
            });
        }
        else {
            var ks = keys(o);
            var i = void 0, k = void 0;
            for (i = 0; i < ks.length; ++i) {
                k = ks[i];
                d[k] = o[k];
            }
        }
    }
    return d;
}
function isEmpty(d) {
    return keys(d).length === 0;
}
function size(d) {
    return keys(d).length;
}
function has(d, k) {
    return Object.prototype.hasOwnProperty.call(d, k);
}
function keyOf(d, v) {
    var ks = keys(d);
    var i;
    var k;
    for (i = 0; i < ks.length; ++i) {
        k = ks[i];
        if (d[k] === v)
            return k;
    }
    return undefined;
}
function keyAt(d, i) {
    return keys(d)[i];
}
function firstKey(d) {
    return keys(d)[0];
}
function lastKey(d) {
    var ks = keys(d);
    return ks.length > 0 ? ks[ks.length - 1] : undefined;
}
function toMap(r) {
    var m = new Map();
    var ks = keys(r);
    var i, k;
    for (i = 0; i < ks.length; ++i) {
        k = ks[i];
        m.set(k, r[k]);
    }
    return m;
}
function invert(r) {
    var rr = D();
    var ks = keys(r);
    var i, k;
    for (i = 0; i < ks.length; ++i) {
        k = ks[i];
        rr[r[k]] = k;
    }
    return rr;
}
function clear(d) {
    var ks = keys(d);
    var i, k;
    for (i = 0; i < ks.length; ++i) {
        k = ks[i];
        delete d[k];
    }
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
D.invert = invert;
D.clear = clear;
exports.default = D;
