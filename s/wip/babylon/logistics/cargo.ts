
import {Scene} from "@babylonjs/core/scene.js"

import {Crate} from "./crate.js"
import {Manifest} from "./manifest.js"
import {Prop} from "../../tools/babyloid.js"

/** A manifest-bearing 3d prop that we can instance */
export class Cargo extends Crate {

	constructor(
			public scene: Scene,
			public prop: Prop,
			public manifest: Manifest,
		) {
		super(scene, prop)
	}
}

