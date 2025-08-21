
import {denew, Scope} from "@e280/stz"

import {makeCanvas} from "../theater2/utils/canvas.js"
import {Autoscaler} from "../theater2/utils/autoscaler.js"
import {Pointerlocker} from "../theater2/utils/pointerlocker.js"

import {makeScene} from "./parts/scene.js"
import {makeEngine} from "./parts/engine.js"

export class Mk {
	#scope = new Scope()

	canvas = makeCanvas
	autoscaler = this.#scope.keepFn(denew(Autoscaler))
	pointerlocker = this.#scope.keepFn(denew(Pointerlocker))

	engine = this.#scope.keepFnAsync(makeEngine)
	scene = this.#scope.keepFn(makeScene)

	dispose = () => this.#scope.dispose()
}

