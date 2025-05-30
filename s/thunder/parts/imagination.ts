
import {sub} from "@e280/stz"
import {Vec4} from "@benev/math"
import {Scene} from "@babylonjs/core/scene.js"
import {Engine} from "@babylonjs/core/Engines/engine.js"
import {WebGPUEngine} from "@babylonjs/core/Engines/webgpuEngine.js"

import {CanvasDetails} from "./types.js"
import {make_scene} from "../../iron/parts/scene.js"
import {Gameloop} from "../../iron/parts/gameloop.js"
import {make_engine} from "../../iron/parts/engine.js"
import {Rendering} from "../../iron/parts/rendering/rendering.js"

export class Imagination {
	static async make() {
		const canvas = new OffscreenCanvas(0, 0)
		const engine = await make_engine({
			canvas,
			webgl: {
				desynchronized: true,
				powerPreference: "high-performance",
			},
		})
		const scene = make_scene({
			engine,
			background: new Vec4(0, 0, 0, 1),
		})
		const rendering = Rendering.make(scene)
		const gameloop = Gameloop.make(engine, [scene])
		return new this(canvas, engine, scene, rendering, gameloop)
	}

	#frame = 0
	onFrame = sub<[count: number, bitmap: ImageBitmap]>()

	constructor(
			public canvas: OffscreenCanvas,
			public engine: Engine | WebGPUEngine,
			public scene: Scene,
			public rendering: Rendering,
			public gameloop: Gameloop,
		) {

		this.gameloop.on(() => {
			const bitmap = this.canvas.transferToImageBitmap()
			this.onFrame.pub(this.#frame++, bitmap)
		})
	}

	updateCanvas({dimensions}: CanvasDetails) {
		const [width, height] = dimensions
		this.canvas.width = width
		this.canvas.height = height
	}
}

