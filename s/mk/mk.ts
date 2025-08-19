
import {Scope} from "@e280/stz"
import {makeScene} from "./parts/scene.js"
import {makeCanvas} from "./parts/canvas.js"
import {makeEngine} from "./parts/engine.js"
import {makePointerlocker} from "./parts/pointerlocker.js"
import {makeAutoscaler} from "./parts/autoscaler.js"

export class Mk {
	#scope = new Scope()

	canvas = makeCanvas
	engine = this.#scope.fnAsyncDisposable(makeEngine)
	scene = this.#scope.fnDisposable(makeScene)
	autoscaler = this.#scope.fnDisposable(makeAutoscaler)
	pointerlocker = this.#scope.fnDisposable(makePointerlocker)

	dispose = () => this.#scope.dispose()
}

