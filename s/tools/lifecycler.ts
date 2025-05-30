
import {MapG} from "@e280/stz"

export type Life<Thing> = {
	update: (thing: Thing) => void
	dispose: () => void
}

export type Spawn<Id, Thing> = (id: Id, thing: Thing) => Life<Thing>

export class Lifecycler<Id, Thing> {
	#map = new MapG<Id, Life<Thing>>()

	constructor(private spawn: Spawn<Id, Thing>) {}

	sync(id: Id, thing: Thing | undefined) {
		const exists = this.#map.get(id)

		// unwanted -- dispose the thing
		if (thing === undefined) {
			this.#map.delete(id)
			if (exists) exists.dispose()
		}

		// already exists -- update the thing
		else if (exists) {
			exists.update(thing)
		}

		// doesn't exist -- spawn the thing
		else {
			const life = this.spawn(id, thing)
			this.#map.set(id, life)
		}
	}
}

