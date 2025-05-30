
import {debounce, nap, sub} from "@e280/stz"

/** use a resize observer to maintain the given resolution ratio for the size of the canvas */
export class CanvasRezzer {
	static make = (
		(canvas: HTMLCanvasElement, fn: (rect: DOMRect) => number) =>
			new this(canvas, fn)
	)

	onChange = sub()

	constructor(
			public readonly canvas: HTMLCanvasElement,
			public fn: (rect: DOMRect) => number,
		) {
		canvas.width = 100
		canvas.height = 100
		nap().then(() => this.#recalibrate())
		new ResizeObserver(() => this.#recalibrate())
			.observe(canvas as any)
	}

	#recalibrate = debounce(100, () => {
		const {canvas} = this
		const rect = canvas.getBoundingClientRect()
		const resolution = this.fn(rect)
		canvas.width = Math.round(rect.width * resolution)
		canvas.height = Math.round(rect.height * resolution)
		this.onChange.pub()
	})
}

