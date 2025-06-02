
import {debounce, sub} from "@e280/stz"

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
		canvas.width = 0
		canvas.height = 0
		new ResizeObserver(() => this.#recalibrateDebounced())
			.observe(canvas as any)
	}

	recalibrate = () => {
		const {canvas} = this
		const rect = canvas.getBoundingClientRect()
		const resolution = this.fn(rect)
		canvas.width = Math.round(rect.width * resolution)
		canvas.height = Math.round(rect.height * resolution)
		this.onChange.pub()
	}

	#recalibrateDebounced = debounce(100, this.recalibrate)
}

