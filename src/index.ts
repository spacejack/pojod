// pojod
// Typed object dictionary helpers
// (c) 2017 by Mike Linkovich
// https://www.github.com/spacejack/pojod
// License: ISC

export type Dict<T> = {
	[id: string]: T
}

export interface Static {
	/** Creates an empty dictionary with no prototype. */
	<T = any>(): Dict<T>
	/** Ceates an empty Record with no prototype */
	<K extends string, V>(): Record<K, V>
	/** Creates an empty dictionary with typed keys and no prototype with the contents of the supplied Map. */
	<K extends string, V>(map: Map<K, V>): Record<K, V>
	/** Creates an empty dictionary with typed keys and no prototype with the contents of the supplied object. */
	<K extends string, V>(record: Record<K, V>): Record<K, V>
	/** Creates an empty dictionary with typed keys and no prototype with the contents of the supplied object. */
	<K extends string, V>(dict: Dict<V>): Record<K, V>
	/** Creates dictionary with no prototype with the contents of the supplied object. */
	<T>(dict: Dict<T>): Dict<T>
	/** Returns true if object has no (own) entries. */
	isEmpty (dict: Dict<any>): boolean
	/** Returns number of (own) keys. */
	size (dict: Dict<any>): number
	/** Returns true if object has (own) key. */
	has (dict: Dict<any>, key: string): boolean
	/** Returns key for first matched value otherwise undefined. */
	keyOf<K extends string, V>(record: Record<K, V>, v: V): K | undefined
	/** Returns key for first matched value otherwise undefined. */
	keyOf<T>(dict: Dict<T>, v: T): string | undefined
	/** Returns nth iterated key or undefined. Object key order caveats apply. */
	keyAt<T extends string>(record: Record<T, any>, index: number): T | undefined
	/** Returns nth iterated key or undefined. Object key order caveats apply. */
	keyAt (dict: Dict<any>, index: number): string | undefined
	/** Returns first iterated key or undefined. Object key order caveats apply. */
	firstKey<T extends string>(record: Record<T, any>): T | undefined
	/** Returns first iterated key or undefined. Object key order caveats apply. */
	firstKey (dict: Dict<any>): string | undefined
	/** Returns last iterated key or undefined. Object key order caveats apply. */
	lastKey<T extends string>(record: Record<T, any>): T | undefined
	/** Returns last iterated key or undefined. Object key order caveats apply. */
	lastKey (dict: Dict<any>): string | undefined
	/** Return array of typed object keys */
	keys<T extends string>(rec: Record<T,any>): T[]
	/** Return array of object keys */
	keys (dict: Dict<any>): string[]
}

function create<T>(o?: Dict<T> | Map<string, T>): Dict<T> {
	const d: Dict<T> = Object.create(null)
	if (o) {
		if (typeof Map !== 'undefined' && o instanceof Map) {
			o.forEach((v: T, k: string) => {
				d[k] = v
			})
		} else {
			const keys = Object.keys(o)
			let k: string
			for (let i = 0; i < keys.length; ++i) {
				k = keys[i]
				if (has(o, k)) d[k] = (o as any)[k]
			}
		}
	}
	return d
}

function isEmpty (d: Dict<any>) {
	return Object.keys(d).length === 0
}

function size (d: Dict<any>) {
	return Object.keys(d).length
}

function has (d: Dict<any>, k: string) {
	return Object.prototype.hasOwnProperty.call(d, k)
}

function keyOf<T>(d: Dict<T>, v: T) {
	const keys = Object.keys(d)
	let i: number
	let k: string
	for (i = 0; i < keys.length; ++i) {
		k = keys[i]
		if (d[k] === v) return k
	}
	return undefined
}

function keyAt (d: Dict<any>, i: number): string | undefined {
	return Object.keys(d)[i]
}

function firstKey (d: Dict<any>): string | undefined {
	return Object.keys(d)[0]
}

function lastKey (d: Dict<any>): string | undefined {
	const ks = Object.keys(d)
	return ks.length > 0 ? ks[ks.length - 1] : undefined
}

function keys (d: Dict<any>) {
	return Object.keys(d)
}

const D: Static = create as any
D.isEmpty = isEmpty
D.size = size
D.has = has
D.keyOf = keyOf
D.keyAt = keyAt
D.firstKey = firstKey
D.lastKey = lastKey
D.keys = keys

export default D
