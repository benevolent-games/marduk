
import {Scene} from "@babylonjs/core/scene.js"
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"
import {Quaternion} from "@babylonjs/core/Maths/math.vector.js"
import {TransformNode} from "@babylonjs/core/Meshes/transformNode.js"
import {InstancedMesh} from "@babylonjs/core/Meshes/instancedMesh.js"

import {babyloid, Meshoid, Prop} from "../tools/babyloid.js"

export function getChildProps(transform: TransformNode) {
	const props = new Map<string, Prop>()
	for (const prop of transform.getChildren(babyloid.is.prop, false))
		props.set(prop.name, prop)
	return props
}

export function getChildMeshoids(transform: TransformNode) {
	const meshoids = new Map<string, Meshoid>()
	for (const meshoid of transform.getChildren(babyloid.is.meshoid, false))
		meshoids.set(meshoid.name, meshoid)
	return meshoids
}

export function getMeshoids(transform: TransformNode) {
	const meshoids = getChildMeshoids(transform)
	if (babyloid.is.meshoid(transform))
		meshoids.set(transform.name, transform)
	return meshoids
}

export function getTopMeshes(transform: TransformNode): Meshoid[] {
	return (babyloid.is.meshoid(transform))
		? [transform]
		: transform.getChildren(babyloid.is.meshoid, true)
}

// export function getTopSourceMeshes(transform: TransformNode): Mesh[] {
// 	return getTopMeshes(transform).map(
// 		m => ("sourceMesh" in m && !!m.sourceMesh)
// 			? m.sourceMesh
// 			: m
// 	) as Mesh[]
// }

// export function onlySources(meshes: Meshoid[]) {
// 	return meshes.filter(m => ("sourceMesh" in m && !!m.sourceMesh))
// }

export function superclone(node: Prop, parent: TransformNode | null, scene: Scene): Prop {
	let clone: TransformNode

	if (node instanceof InstancedMesh)
		clone = node.sourceMesh.clone(`${node.name}_clone`, parent) as Mesh
	else if (node instanceof Mesh)
		clone = node.clone(`${node.name}_clone`, parent)
	else {
		clone = new TransformNode(`${node.name}_clone`, scene)
		if (parent)
			clone.parent = parent
	}

	// copy transforms
	clone.position.copyFrom(node.position)
	clone.scaling.copyFrom(node.scaling)
	if (node.rotationQuaternion)
		clone.rotationQuaternion = (clone.rotationQuaternion || new Quaternion())
			.copyFrom(node.rotationQuaternion)
	else
		clone.rotation.copyFrom(node.rotation)

	// recursively clone children
	for (const child of node.getChildTransformNodes())
		superclone(child, clone, scene)

	return clone
}

