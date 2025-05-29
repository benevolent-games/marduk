
import {Comrade} from "@e280/comrade"
import {setupThunderWorker} from "./parts/worker.js"
import {FigmentSpec, ThunderSchematic} from "./parts/types.js"

export type ThunderHostOptions = {
	workerUrl: URL | string
}

export class Thunder<F extends FigmentSpec> {
	constructor(public thread: Comrade.Thread<ThunderSchematic<F>>) {}

	static setupWorker = setupThunderWorker

	static async setupHost<F extends FigmentSpec>(options: ThunderHostOptions) {
		return new this<F>(
			await Comrade.thread<ThunderSchematic<F>>({
				label: "thunder",
				workerUrl: options.workerUrl,
				setupHost: () => ({
					async deliverFrame(frame, bitmap) {
						console.log("frame", frame, bitmap.width, bitmap.height)
					},
				}),
			})
		)
	}
}

