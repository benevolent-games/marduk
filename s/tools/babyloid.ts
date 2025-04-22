
import {QuatArray, Vec3Array} from "@benev/math"

import {Node} from "@babylonjs/core/node.js"
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"
import {InstancedMesh} from "@babylonjs/core/Meshes/instancedMesh.js"
import {TransformNode} from "@babylonjs/core/Meshes/transformNode.js"
import {Quaternion, Vector3} from "@babylonjs/core/Maths/math.vector.js"

export type Meshoid = Mesh | InstancedMesh
export type Prop = TransformNode | Meshoid

/** utilities for working with babylon objects. */
export const babyloid = {

	/** check what type of babylon node you'd dealing with. */
	is: {
		prop: (node: Node): node is Prop => (
			node instanceof TransformNode
		),
		meshoid: (node: Node): node is Meshoid => (
			node instanceof InstancedMesh ||
			node instanceof Mesh
		),
	},

	/** convert to toolbox maths. */
	to: {
		vec3: ({x, y, z}: Vector3): Vec3Array => [x, y, z],
		quat: ({x, y, z, w}: Quaternion): QuatArray => [x, y, z, w],
	},

	/** convert to babylon maths. */
	from: {
		vec3: (v: Vec3Array) => new Vector3(...v),
		quat: (q: QuatArray) => new Quaternion(...q),
	},

	/** obtain a toolbox quat from a babylon transform node. */
	ascertain: {
		absoluteQuat: (transform: TransformNode) => {
			return babyloid.to.quat(transform.absoluteRotationQuaternion ?? (
				Quaternion.RotationYawPitchRoll(
					transform.rotation.y,
					transform.rotation.x,
					transform.rotation.z,
				)
			))
		},
		quat: (transform: TransformNode) => {
			return babyloid.to.quat(transform.rotationQuaternion ?? (
				Quaternion.RotationYawPitchRoll(
					transform.rotation.y,
					transform.rotation.x,
					transform.rotation.z,
				)
			))
		},
	},
}

