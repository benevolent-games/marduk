
import {sub} from "@e280/stz"
import {Vec4} from "@benev/math"
import {Scene} from "@babylonjs/core/scene.js"
import {Engine} from "@babylonjs/core/Engines/engine.js"
import {WebGPUEngine} from "@babylonjs/core/Engines/webgpuEngine.js"

import {Iron} from "../../iron/iron.js"
import {CanvasDetails} from "./types.js"
import {Gameloop} from "../../iron/parts/gameloop.js"

export class Imagination {
	static async make() {
		const canvas = new OffscreenCanvas(200, 100)
		const engine = await Iron.engine({
			canvas,
			webgl: {
				desynchronized: true,
				powerPreference: "high-performance",
			},
		})
		const scene = Iron.scene({
			engine,
			background: new Vec4(0.1, 0.1, 0.1, 1),
		})
		const gameloop = Iron.gameloop(engine, [scene])
		return new this(canvas, engine, scene, gameloop)
	}

	onFrame = sub<[number, ImageBitmap]>()

	constructor(
			public canvas: OffscreenCanvas,
			public engine: Engine | WebGPUEngine,
			public scene: Scene,
			public gameloop: Gameloop,
		) {

		this.gameloop.on(frame => {
			const bitmap = this.canvas.transferToImageBitmap()
			this.onFrame.pub(frame, bitmap)
		})
	}

	updateCanvas({dimensions, resolution}: CanvasDetails) {
		const [width, height] = dimensions
		this.canvas.width = Math.round(width * resolution)
		this.canvas.height = Math.round(height * resolution)
	}
}

