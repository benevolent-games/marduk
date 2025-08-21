
import {looper} from "../../../tools/looper.js"
import {Figcycler} from "../../../theater2/layers/fig.js"
import {DemoFigs, DemoPayload, DemoResult} from "./types.js"
import {renderingWorker} from "../../../theater2/layers/rendering.js"

let play = false
let timestamp = 0

const canvas = new OffscreenCanvas(1, 1)
const ctx = canvas.getContext("2d")!

const figcycler = new Figcycler<DemoFigs>({
	canvas: () => ({
		update(data) {
			play = data.play
			const [x, y] = data.dimensions
			canvas.width = x
			canvas.height = y
		},
		tick() {},
		dispose() {},
	}),
	timestamp: () => ({
		update(time) {
			timestamp = time
		},
		tick() {},
		dispose() {},
	}),
})

const host = await renderingWorker<DemoPayload, DemoResult>(() => ({
	async supply(syncs) {
		figcycler.sync(syncs)
	},
}))

looper(async() => {
	if (!play) return undefined
	if (!ctx) return undefined

	ctx.fillStyle = "#000"
	ctx.fillRect(0, 0, canvas.width, canvas.height)

	ctx.fillStyle = "#fff8"
	ctx.font = "12px sans-serif"
	ctx.fillText(timestamp.toString(), 4, 32)

	const bitmap = canvas.transferToImageBitmap()
	await host.deliver({bitmap})
})

