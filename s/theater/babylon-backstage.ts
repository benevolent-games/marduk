
import {sub} from "@e280/stz"
import {Vec4} from "@benev/math"
import {Scene} from "@babylonjs/core/scene.js"
import {Engine} from "@babylonjs/core/Engines/engine.js"
import {WebGPUEngine} from "@babylonjs/core/Engines/webgpuEngine.js"

import {Backstage} from "./parts/backstage.js"
import {make_scene} from "../babylon/iron/scene.js"
import {Lifecycle} from "../tools/lifecycler.js"
import {Gameloop} from "../babylon/iron/gameloop.js"
import {make_engine} from "../babylon/iron/engine.js"
import {Rendering} from "../babylon/iron/rendering/rendering.js"
import {CanvasDetails, FigmentId, FigmentSpec, FigmentTupleAny, Frame} from "./parts/types.js"

export type BabylonStagecraft = {
	canvas: OffscreenCanvas
	engine: Engine | WebGPUEngine
	scene: Scene
	rendering: Rendering
	gameloop: Gameloop
}

export async function babylonBackstage<Fs extends FigmentSpec>(
		establish: (stagecraft: BabylonStagecraft) => Promise<{
			lifecycle: Lifecycle<FigmentId, FigmentTupleAny<Fs>>
		}>,
	) {

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

	const stagecraft: BabylonStagecraft = {
		canvas,
		engine,
		scene,
		rendering,
		gameloop,
	}

	let frameCount = 0
	const onFrame = sub<[Frame]>()

	gameloop.on(() => {
		const bitmap = canvas.transferToImageBitmap()
		onFrame.pub({
			bitmap,
			count: frameCount++,
		})
	})

	function updateCanvas({dimensions}: CanvasDetails) {
		const [width, height] = dimensions
		canvas.width = width
		canvas.height = height
	}

	return {
		...stagecraft,
		...await establish(stagecraft),
		onFrame,
		updateCanvas,
	} satisfies Backstage<Fs> & BabylonStagecraft
}

