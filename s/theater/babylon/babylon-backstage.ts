
import {sub} from "@e280/stz"
import {Vec4} from "@benev/math"

import type {Scene} from "@babylonjs/core/scene.js"
import type {Engine} from "@babylonjs/core/Engines/engine.js"
import type {WebGPUEngine} from "@babylonjs/core/Engines/webgpuEngine.js"

import {consolidateSpawners} from "../browser/spawners.js"
import {make_scene} from "../../wip/babylon/iron/scene.js"
import {Gameloop} from "../../wip/babylon/iron/gameloop.js"
import {make_engine} from "../../wip/babylon/iron/engine.js"
import {FigmentSpawners, FigmentSpec} from "../pure/types.js"
import {Backstage, CanvasDetails, Frame} from "../browser/types.js"
import {Rendering} from "../../wip/babylon/iron/rendering/rendering.js"

export type BabylonStagecraft = {
	canvas: OffscreenCanvas
	engine: Engine | WebGPUEngine
	scene: Scene
	rendering: Rendering
	gameloop: Gameloop
}

export async function babylonBackstage<Fs extends FigmentSpec>(
		establish: (stagecraft: BabylonStagecraft) => Promise<FigmentSpawners<Fs>>,
	): Promise<Backstage<Fs> & BabylonStagecraft> {

	let frameCount = 0
	const onFrame = sub<[Frame]>()
	const stagecraft = await prepareBabylonStagecraft()
	const {canvas} = stagecraft

	stagecraft.gameloop.on(async() => {
		if (canvas.width > 0 && canvas.height > 0) {
			onFrame.pub({
				bitmap: stagecraft.canvas.transferToImageBitmap(),
				count: frameCount++,
			})
		}
	})

	function updateCanvas({dimensions}: CanvasDetails) {
		const [width, height] = dimensions
		stagecraft.canvas.width = width
		stagecraft.canvas.height = height
	}

	const spawners = await establish(stagecraft)
	stagecraft.gameloop.start()

	return {
		...stagecraft,
		onFrame,
		updateCanvas,
		spawn: consolidateSpawners(spawners),
	}
}

async function prepareBabylonStagecraft(): Promise<BabylonStagecraft> {
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
	return {
		canvas,
		engine,
		scene,
		rendering,
		gameloop,
	}
}

