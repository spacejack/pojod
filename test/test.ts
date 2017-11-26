declare const require: (moduleName: string) => any
import D, {Dict} from '../src'
const o = require('ospec')

o.spec("pojod", () => {

	o("create empty works", () => {
		const a = D()
		o(typeof a).equals('object')
		o(a.__proto__).equals(undefined)
		o(D.size(a)).equals(0)
	})

	o("create from object works", () => {
		const a = D({a: 1, b: 2})
		o(a.a).equals(1)
		o(a.b).equals(2)
		o((a as any).c).equals(undefined)
		o(D.size(a)).equals(2)
	})

	o("create from Map works", () => {
		const m = new Map<string, number>()
		m.set('a', 1)
		m.set('b', 2)
		const a = D(m)
		o(a.a).equals(1)
		o(a.b).equals(2)
		o(a.c).equals(undefined)
		o(D.size(a)).equals(2)
	})

	o("size works without prototype", () => {
		const a = D<number>({a: 1, b: 2, c: 3})
		o(D.size(a)).equals(3)
		o(D.size(a)).equals(Object.keys(a).length)
		a.d = 4
		o(D.size(a)).equals(4)
		delete a.a
		o(D.size(a)).equals(3)
	})

	o("size works with prototype", () => {
		const a: Dict<number> = {a: 1, b: 2, c: 3}
		o(D.size(a)).equals(3)
		o(D.size(a)).equals(Object.keys(a).length)
		a.d = 4
		o(D.size(a)).equals(4)
		delete a.a
		o(D.size(a)).equals(3)
	})

	o("isEmpty works", () => {
		const a = {}
		o(D.isEmpty(a)).equals(true)
		const b = {a: 1}
		o(D.isEmpty(b)).equals(false)
		delete b.a
		o(D.isEmpty(b)).equals(true)
		const c = D()
		o(D.isEmpty(c)).equals(true)
	})

	o("has works", () => {
		const a = {a: 1}
		o(D.has(a, 'a')).equals(true)
		o(D.has(a, 'toString')).equals(false)
	})

	o("keyOf works", () => {
		const a = {a: 'abc', b: 2, c: '0', d: 'abc', e: 2}
		o(D.keyOf(a, 'abc')).equals('a')
		o(D.keyOf(a, 2)).equals('b')
		o(D.keyOf(a, 0)).equals(undefined)
	})

	o("keyAt works", () => {
		const a: Dict<string | number> = {x: 'abc', y: 2, z: '0'}
		o(D.keyAt(a, 2)).equals('z')
		o(D.keyAt(a, 1)).equals('y')
		o(D.keyAt(a, 0)).equals('x')
		a.a = 0
		o(D.keyAt(a, 3)).equals('a')
		o(D.keyAt(a, 4)).equals(undefined)
	})

	o("firstKey works", () => {
		const a = {x: 'abc', y: 2, z: '0'}
		o(D.firstKey(a)).equals('x')
		const b = {}
		o(D.firstKey(b)).equals(undefined)
	})

	o("lastKey works", () => {
		const a = D({x: 'abc', y: 2, z: '0'})
		o(D.lastKey(a)).equals('z')
		const b = {}
		o(D.lastKey(b)).equals(undefined)
	})

	o("keys works", () => {
		const a = {a: 1, b: 2, c: 3}
		o(Array.isArray(D.keys(a))).equals(true)
		o(D.keys(a).length).equals(3)
		o(D.keys(a)[2] === 'c').equals(true)
	})
})

o.run()
