
import {Sub, sub} from "@e280/stz"
import {Comrade} from "@e280/comrade"
import {FigmentSpec, ThunderSchematic} from "./parts/types.js"

export type ThunderHostOptions = {
	workerUrl: URL | string
}

export class Thunder<Fs extends FigmentSpec = any> {

	constructor(
		public thread: Comrade.Thread<ThunderSchematic<Fs>>,
		public onFrame: Sub<[number, ImageBitmap]>,
	) {}

	static async setupHost<F extends FigmentSpec>(options: ThunderHostOptions) {
		const onFrame = sub<[number, ImageBitmap]>()

		const thread = await Comrade.thread<ThunderSchematic<F>>({
			label: "thunder",
			workerUrl: options.workerUrl,
			timeout: 1_000,
			setupHost: () => ({
				deliverFrame: async(frame, bitmap) => {
					onFrame.pub(frame, bitmap)
				},
			}),
		})

		return new this<F>(thread, onFrame)
	}
}

