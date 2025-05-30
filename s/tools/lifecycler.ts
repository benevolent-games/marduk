
import {MapG, sub} from "@e280/stz"

export type Lifecycle<Id, Thing> = {
	create: (id: Id, thing: Thing) => void
	update: (id: Id, thing: Thing) => void
	delete: (id: Id) => void
}

export class Lifecycler<Id, Thing> {
	map = new MapG<Id, Thing>()
	onCreate = sub<[Id, Thing]>()
	onUpdate = sub<[Id, Thing]>()
	onDelete = sub<[Id]>()

	constructor(fns?: Lifecycle<Id, Thing>) {
		if (fns) {
			this.onCreate(fns.create)
			this.onUpdate(fns.update)
			this.onDelete(fns.delete)
		}
	}

	sync(id: Id, thing: Thing | undefined) {

		// delete
		if (thing === undefined) {
			const deleted = this.map.delete(id)
			if (deleted) this.onDelete.pub(id)
		}
		else {
			const isUpdate = this.map.has(id)
			this.map.set(id, thing)

			// update
			if (isUpdate) this.onUpdate.pub(id, thing)

			// create
			else this.onCreate.pub(id, thing)
		}
	}
}

