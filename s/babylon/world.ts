
import {Scalar, Vec4} from "@benev/math"
import {AssetContainer} from "@babylonjs/core/assetContainer.js"
import {Scene, ScenePerformancePriority} from "@babylonjs/core/scene.js"

import {loadGlb} from "./load-glb/load-glb.js"
import {AnyEngine} from "./iron/types.js"
import {make_scene} from "./iron/scene.js"
import {Gameloop} from "./iron/gameloop.js"
import {make_engine} from "./iron/engine.js"
import {CanvasRezzer} from "./iron/canvas-rezzer.js"
import {Rendering} from "./iron/rendering/rendering.js"

export class World {
	static load = async() => {
		const canvas = document.createElement("canvas")

		const engine = await make_engine({
			canvas,
			webgl: {
				alpha: false,
				antialias: false,
				desynchronized: true,
				preserveDrawingBuffer: false,
				powerPreference: "high-performance",
			},
			// webgpu: {
			// 	antialias: true,
			// 	audioEngine: true,
			// 	powerPreference: "high-performance",
			// },
		})

		const rezzer = new CanvasRezzer(canvas, rect => {
			return Scalar.clamp(
				Scalar.remap(
					rect.height,
					400, 1080,
					0.5, 0.25,
				),
				0.25,
				1,
			)
		})

		const scene = make_scene({engine, background: Vec4.from([0, 0, 0, 1])})
		// scene.useOrderIndependentTransparency = true
		scene.performancePriority = ScenePerformancePriority.Intermediate
		scene.skipPointerMovePicking = true
		scene.skipPointerDownPicking = true
		scene.skipPointerUpPicking = true

		const gameloop = Gameloop.make(engine, [scene])
		const rendering = Rendering.make(scene)

		function dispose() {
			gameloop.stop()
			scene.dispose()
			engine.dispose()
		}

		return new this(
			canvas,
			rezzer,
			engine,
			scene,
			gameloop,
			rendering,
			dispose,
		)
	}

	constructor(
		public readonly canvas: HTMLCanvasElement,
		public readonly rezzer: CanvasRezzer,
		public readonly engine: AnyEngine,
		public readonly scene: Scene,
		public readonly gameloop: Gameloop,
		public readonly rendering: Rendering,
		public readonly dispose: () => void,
	) {}

	async loadContainer(url: string): Promise<AssetContainer> {
		return await loadGlb(this.scene, url)
	}
}

