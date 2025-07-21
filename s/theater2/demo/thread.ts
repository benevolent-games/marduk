
import {DemoPayload, DemoResult} from "./types.js"
import {renderingThread} from "../layers/rendering.js"
import {isBitmapClosed} from "../../tools/is-bitmap-closed.js"

export async function makeFrontstageThread(workerUrl: string) {
	const canvas = document.createElement("canvas")
	const ctx = canvas.getContext("2d")!

	const thread = await renderingThread<DemoPayload, DemoResult>({
		workerUrl,
		label: "mardukFrontendRendering",
		setupHost: () => ({
			async deliver({bitmap}) {
				if (canvas.isConnected && !isBitmapClosed(bitmap))
				ctx.drawImage(bitmap, 0, 0)
				bitmap.close()
			},
		}),
	})

	return {canvas, thread}
}

