
import {loop} from "@e280/stz"
import {MapG, Trashbin} from "@benev/slate"

export type PoolNoodle = {
	enable: () => void
	disable: () => void
	dispose: () => void
}

export class Pool<P> {
	#noodles = new MapG<P, PoolNoodle>()
	#free: P[] = []
	#alive = new Set<P>()

	constructor(public make: () => ({payload: P, noodle: PoolNoodle})) {}

	get size() {
		return this.#free.length + this.#alive.size
	}

	preload(count: number) {
		for (const _ of loop(count)) {
			const {payload, noodle} = this.make()
			noodle.disable()
			this.#noodles.set(payload, noodle)
			this.#free.push(payload)
		}
	}

	acquire() {
		let payload = this.#free.pop()
		if (!payload) {
			const fresh = this.make()
			payload = fresh.payload
			this.#noodles.set(payload, fresh.noodle)
		}
		const noodle = this.#noodles.require(payload)
		this.#alive.add(payload)
		noodle.enable()
		return payload
	}

	borrow(trashbin: Trashbin) {
		const payload = this.acquire()
		const releaser = () => this.release(payload)
		trashbin.disposer(releaser)
		return payload
	}

	release(payload: P) {
		const noodle = this.#noodles.require(payload)
		noodle.disable()
		this.#alive.delete(payload)
		this.#free.push(payload)
	}

	dispose() {
		for (const noodle of this.#noodles.values())
			noodle.dispose()
		this.#noodles.clear()
		this.#alive.clear()
		this.#free = []
	}
}

