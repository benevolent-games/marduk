
import {sub} from "@e280/stz"
import {Vec4} from "@benev/math"
import {Scene} from "@babylonjs/core/scene.js"
import {Engine} from "@babylonjs/core/Engines/engine.js"
import {WebGPUEngine} from "@babylonjs/core/Engines/webgpuEngine.js"

import {Backstage} from "./parts/backstage.js"
import {make_scene} from "../babylon/iron/scene.js"
import {Gameloop} from "../babylon/iron/gameloop.js"
import {make_engine} from "../babylon/iron/engine.js"
import {consolidateSpawners} from "./parts/spawners.js"
import {Rendering} from "../babylon/iron/rendering/rendering.js"
import {CanvasDetails, FigmentSpawners, FigmentSpec, Frame} from "./parts/types.js"

export type BabylonStagecraft = {
	canvas: OffscreenCanvas
	engine: Engine | WebGPUEngine
	scene: Scene
	rendering: Rendering
	gameloop: Gameloop
}

export async function babylonBackstage<Fs extends FigmentSpec>(
		establish: (stagecraft: BabylonStagecraft) => Promise<FigmentSpawners<Fs>>,
	) {

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
	} satisfies Backstage<Fs> & BabylonStagecraft
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

