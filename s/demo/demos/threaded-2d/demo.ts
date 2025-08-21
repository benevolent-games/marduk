
import {DemoFn} from "../../harness/view.js"
import {DemoPayload, DemoResult} from "./types.js"
import {rafloop} from "../../../theater2/utils/rafloop.js"
import {Autoscaler} from "../../../theater2/utils/autoscaler.js"
import {isBitmapClosed} from "../../../tools/is-bitmap-closed.js"
import {makeLilCanvasView} from "../../harness/lil-canvas-view.js"
import {renderingThread} from "../../../theater2/layers/rendering.js"

export default <DemoFn>(async() => {
	const canvas = document.createElement("canvas")
	const autoscaler = new Autoscaler(canvas)
	const afterFirstRender = () => autoscaler.rescale()

	const ctx = canvas.getContext("2d")!
	let latestBitmap: ImageBitmap | undefined

	const thread = await renderingThread<DemoPayload, DemoResult>({
		workerUrl: "/demo/demos/threaded-2d/worker.bundle.min.js",
		setupHost: () => ({
			async deliver({bitmap}) {
				if (isBitmapClosed(bitmap)) return
				if (latestBitmap) bitmap.close()
				latestBitmap = bitmap
			},
		}),
	})

	const stop = rafloop(async() => {
		if (canvas.isConnected && latestBitmap && !isBitmapClosed(latestBitmap)) {
			ctx.drawImage(latestBitmap, 0, 0)
			latestBitmap.close()
			latestBitmap = undefined
		}
	})

	// thread.work.supply()

	return {
		demoView: makeLilCanvasView(canvas, afterFirstRender),
		dispose: () => {
			stop()
			thread.terminate()
		},
	}
})

