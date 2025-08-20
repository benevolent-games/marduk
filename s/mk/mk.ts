
import {denew, Scope} from "@e280/stz"
import {makeScene} from "./parts/scene.js"
import {makeCanvas} from "./parts/canvas.js"
import {makeEngine} from "./parts/engine.js"
import {Autoscaler} from "./parts/autoscaler.js"
import {Pointerlocker} from "./parts/pointerlocker.js"

export class Mk {
	#scope = new Scope()

	canvas = makeCanvas
	engine = this.#scope.keepFnAsync(makeEngine)
	scene = this.#scope.keepFn(makeScene)
	autoscaler = this.#scope.keepFn(denew(Autoscaler))
	pointerlocker = this.#scope.keepFn(denew(Pointerlocker))

	dispose = () => this.#scope.dispose()
}

