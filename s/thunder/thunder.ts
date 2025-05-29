
import {Comrade} from "@e280/comrade"
import {setupThunderWorker} from "./parts/worker.js"
import {FigmentSpec, ThunderSchematic} from "./parts/types.js"

export type ThunderHostOptions = {
	workerUrl: URL | string
}

export class Thunder<Fs extends FigmentSpec = any> {
	constructor(public thread: Comrade.Thread<ThunderSchematic<Fs>>) {}

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

