
import {make_scene} from "./parts/scene.js"
import {Gameloop} from "./parts/gameloop.js"
import {make_engine} from "./parts/engine.js"
import {loadGlb} from "./parts/load-glb/load-glb.js"
import {CanvasScaler} from "./parts/canvas-scaler.js"
import {CanvasRezzer} from "./parts/canvas-rezzer.js"
import {PointerLocker} from "./parts/pointer-locker.js"
import {Rendering} from "./parts/rendering/rendering.js"

export class Iron {
	static canvas = () => document.createElement("canvas")
	static canvasScaler = CanvasScaler.make
	static canvasRezzer = CanvasRezzer.make

	static engine = make_engine
	static scene = make_scene

	static gameloop = Gameloop.make
	static pointerLocker = PointerLocker.make
	static rendering = Rendering.make

	static loadGlb = loadGlb
}

