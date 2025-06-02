
import {MapG} from "@benev/slate"
import {Scene} from "@babylonjs/core/scene.js"
import {AssetContainer} from "@babylonjs/core/assetContainer.js"

import {Cargo} from "./cargo.js"
import {Manifest} from "./manifest.js"
import {ManifestQuery} from "./types.js"

/** Collection of cargo (3d props) */
export class Warehouse extends Set<Cargo> {
	constructor(public scene: Scene, cargos: Cargo[] = []) {
		super(cargos)
	}

	static from(container: AssetContainer) {
		return new this(
			container.scene,
			[...container.meshes, ...container.transformNodes]
				.filter(prop => !prop.name.includes("_primitive"))
				.map(prop => new Cargo(container.scene, prop, Manifest.scan(prop)))
		)
	}

	list() {
		return [...this]
	}

	/** get all cargo that matches the manifest query */
	#query(search: ManifestQuery, required: boolean = false) {
		const result = new Warehouse(
			this.scene,
			[...this].filter(cargo =>
				Object.entries(search).every(([key, value]) => (
					(value === true && cargo.manifest.has(key)) ||
					(value === false && !cargo.manifest.has(key)) ||
					(cargo.manifest.get(key) === value)
				))
			)
		)
		if (required && result.size === 0)
			throw new Error(`search query failed ${JSON.stringify(search)}`)
		return result
	}

	filter(query: ManifestQuery) {
		return this.#query(query, false)
	}

	filterRequire(query: ManifestQuery) {
		return this.#query(query, true)
	}

	get(query: ManifestQuery) {
		for (const cargo of this) {
			if (cargo.manifest.match(query))
				return cargo
		}
	}

	require(query: ManifestQuery) {
		const cargo = this.get(query)
		if (!cargo)
			throw new Error(`cargo not found in warehouse, ${JSON.stringify(query)}`)
		return cargo
	}

	/** organize objects by their value for the given manifest key */
	categorize(key: string) {
		const map = new MapG<string, Warehouse>()
		for (const cargo of this) {
			if (cargo.manifest.has(key)) {
				const value = cargo.manifest.get(key)!
				const warehouse = map.guarantee(value, () => new Warehouse(this.scene))
				warehouse.add(cargo)
			}
		}
		return map
	}
}

