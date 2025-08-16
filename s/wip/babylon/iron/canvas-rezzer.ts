
import {debounce, sub} from "@e280/stz"

const defaultFn = () => 1

/** use a resize observer to maintain the given resolution ratio for the size of the canvas */
export class CanvasRezzer {
	on = sub<[resolution: number]>()
	#observer: ResizeObserver

	constructor(
			public readonly canvas: HTMLCanvasElement,
			public fn: (rect: DOMRect) => number = defaultFn,
		) {
		canvas.width = 0
		canvas.height = 0
		this.#observer = new ResizeObserver(() => this.reconsider())
		this.#observer.observe(canvas)
	}

	recalibrate = () => {
		const {canvas} = this
		const rect = canvas.getBoundingClientRect()
		const resolution = this.fn(rect)
		canvas.width = Math.round(rect.width * resolution)
		canvas.height = Math.round(rect.height * resolution)
		this.on.pub(resolution)
	}

	reconsider = debounce(100, this.recalibrate)

	dispose() {
		this.#observer.disconnect()
	}
}

