
import {Comrade} from "@e280/comrade"
import {FigmentSpec, ThunderSchematic} from "./parts/types.js"

export type ThunderHostOptions = {
	workerUrl: URL | string
}

export class Thunder<Fs extends FigmentSpec = any> {
	constructor(public thread: Comrade.Thread<ThunderSchematic<Fs>>) {}

	static async setupHost<F extends FigmentSpec>(options: ThunderHostOptions) {
		return new this<F>(
			await Comrade.thread<ThunderSchematic<F>>({
				label: "thunder",
				workerUrl: options.workerUrl,
				timeout: 1_000,
				setupHost: () => ({
					async deliverFrame(frame, bitmap) {
						console.log("frame", frame, bitmap.width, bitmap.height)
					},
				}),
			})
		)
	}
}

