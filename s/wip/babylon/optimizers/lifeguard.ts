
import {MapG} from "@e280/stz"
import {PropPool} from "./prop-pool.js"
import {Cargo} from "../logistics/cargo.js"
import {Prop} from "../../tools/babyloid.js"

export type PooledProp = [Prop, () => void]

export class Lifeguard {
	#instances = new MapG<Cargo, PropPool>()
	#clones = new MapG<Cargo, PropPool>()

	pool(cargo: Cargo, instance: boolean) {
		const pools = instance
			? this.#instances
			: this.#clones
		return pools.guarantee(cargo, () => new PropPool(cargo, instance))
	}

	spawn(cargo: Cargo, instance = true) {
		const pool = this.pool(cargo, instance)
		const prop = pool.acquire()
		const release = () => pool.release(prop)
		return [prop, release] as PooledProp
	}

	report() {
		const lines: string[] = []

		for (const [cargo, pool] of this.#instances)
			lines.push(` • ${pool.size} instances ${cargo.manifest.toString()}`)

		for (const [cargo, pool] of this.#clones)
			lines.push(` • ${pool.size} clones ${cargo.manifest.toString()}`)

		return lines
	}

	dispose() {
		for (const pool of this.#instances.values())
			pool.dispose()

		for (const pool of this.#clones.values())
			pool.dispose()
	}
}

