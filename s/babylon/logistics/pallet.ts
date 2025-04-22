
import {MapG} from "@e280/stz"
import {TransformNode} from "@babylonjs/core/Meshes/transformNode.js"
import {AnimationGroup} from "@babylonjs/core/Animations/animationGroup.js"
import {AssetContainer, InstantiatedEntries} from "@babylonjs/core/assetContainer.js"

import {Cargo} from "./cargo.js"
import {Spatial} from "./types.js"
import {Manifest} from "./manifest.js"
import {Warehouse} from "./warehouse.js"
import {applySpatial} from "./apply-spatial.js"
import {PoolNoodle} from "../optimizers/pool.js"
import {Meshoid, Prop} from "../../tools/babyloid.js"
import {getChildProps, getMeshoids} from "../babylon-helpers.js"

/** an instance of an asset container, useful to maintain the brittle relationships between animationGroups and skeletons */
export class Pallet implements PoolNoodle {
	root: Prop
	warehouse: Warehouse
	instantiated: InstantiatedEntries

	meshoids = new Set<Meshoid>()
	animationGroups = new MapG<string, AnimationGroup>()

	constructor(public container: AssetContainer) {
		this.instantiated = container.instantiateModelsToScene(n => n)
		const [__root__] = this.instantiated.rootNodes

		this.root = new TransformNode("pallet", container.scene)

		this.warehouse = new Warehouse(
			container.scene,
			this.instantiated.rootNodes
				.filter(root => root instanceof TransformNode)
				.flatMap(root => [root, ...getChildProps(root).values()])
				.map(prop => new Cargo(container.scene, prop, Manifest.scan(prop)))
		)

		for (const cargo of this.warehouse)
			for (const [,meshoid] of getMeshoids(cargo.prop))
				this.meshoids.add(meshoid)

		for (const animationGroup of this.instantiated.animationGroups)
			this.animationGroups.set(animationGroup.name, animationGroup)

		for (const cargo of this.warehouse) {
			cargo.prop.setParent(this.root)
		}
	}

	applySpatial(spatial: Partial<Spatial>) {
		applySpatial(this.root, spatial)
	}

	enable() {
		this.root.setEnabled(true)
	}

	disable() {
		this.root.setEnabled(false)
	}

	dispose() {
		this.instantiated.dispose()
	}
}

