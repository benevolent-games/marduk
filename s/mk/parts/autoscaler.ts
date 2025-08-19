
import {Vec2} from "@benev/math"
import {debounce, sub} from "@e280/stz"

export function makeAutoscaler(...p: ConstructorParameters<typeof Autoscaler>) {
	return new Autoscaler(...p)
}

export type AutoscaleFn = (rect: DOMRect) => Vec2

export class Autoscaler {
	static resolution(res: number): AutoscaleFn {
		return rect => Vec2.new(res * rect.width, res * rect.height)
	}

	on = sub<[size: Vec2]>()
	#observer: ResizeObserver

	constructor(
			public readonly canvas: HTMLCanvasElement,
			public fn: AutoscaleFn = Autoscaler.resolution(1),
		) {
		canvas.width = 0
		canvas.height = 0
		this.#observer = new ResizeObserver(() => this.reconsider())
		this.#observer.observe(canvas)
	}

	rescale = () => {
		const {canvas} = this
		const rect = canvas.getBoundingClientRect()
		const scale = this.fn(rect).clone().round()
		canvas.width = Math.round(scale.x)
		canvas.height = Math.round(scale.y)
		this.on.pub(scale)
		return scale
	}

	reconsider = debounce(100, this.rescale)

	dispose() {
		this.#observer.disconnect()
	}
}

