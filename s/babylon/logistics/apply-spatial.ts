
import {Quaternion} from "@babylonjs/core/Maths/math.vector.js"

import {Spatial} from "./types.js"
import {Prop} from "../../tools/babyloid.js"

export function applySpatial(
		prop: Prop,
		{position, rotation, scale}: Partial<Spatial> = {},
	) {

	if (position)
		prop.position.set(...position.array())

	if (rotation)
		prop.rotationQuaternion = new Quaternion().set(...rotation.array())

	if (scale)
		prop.scaling.set(...scale.array())
}

