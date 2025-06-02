
import {Scene} from "@babylonjs/core/scene.js"

import {Spatial} from "./types.js"
import {Prop} from "../../tools/babyloid.js"
import {applySpatial} from "./apply-spatial.js"
import {superclone} from "../babylon-helpers.js"

/** A 3d prop that we can instance */
export class Crate {
	constructor(public scene: Scene, public prop: Prop) {}

	instance(spatial: Partial<Spatial> = {}): Prop {
		const instance = this.prop.instantiateHierarchy(
			undefined,
			undefined,
			(source, clone) => {
				clone.name = source.name
			},
		)!
		applySpatial(instance, spatial)
		return instance
	}

	clone(spatial: Partial<Spatial> = {}): Prop {
		const clone = superclone(this.prop, null, this.scene)
		applySpatial(clone, spatial)
		return clone
	}
}

