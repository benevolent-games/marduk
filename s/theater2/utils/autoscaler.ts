
import {Vec2} from "@benev/math"
import {debounce, sub} from "@e280/stz"

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
		canvas.width = 1
		canvas.height = 1
		this.#observer = new ResizeObserver(() => this.reconsider())
		this.#observer.observe(canvas)
	}

	rescale = () => {
		const {canvas} = this
		const rect = canvas.getBoundingClientRect()
		const scale = this.fn(rect).clone().round()
		canvas.width = Math.max(1, Math.round(scale.x))
		canvas.height = Math.max(1, Math.round(scale.y))
		this.on.pub(scale)
		return scale
	}

	reconsider = debounce(100, this.rescale)

	dispose() {
		this.#observer.disconnect()
	}
}

