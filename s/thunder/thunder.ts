
import {Sub, sub} from "@e280/stz"
import {Comrade} from "@e280/comrade"
import {FigmentSpec, Frame, ThunderSchematic} from "./parts/types.js"

export type ThunderHostOptions = {
	workerUrl: URL | string
}

export class Thunder<Fs extends FigmentSpec = any> {

	constructor(
		public thread: Comrade.Thread<ThunderSchematic<Fs>>,
		public onFrame: Sub<[frame: Frame]>,
	) {}

	static async host<F extends FigmentSpec>(options: ThunderHostOptions) {
		const onFrame = sub<[frame: Frame]>()

		const thread = await Comrade.thread<ThunderSchematic<F>>({
			label: "thunder",
			workerUrl: options.workerUrl,
			timeout: 1_000,
			setupHost: () => ({
				deliverFrame: async frame => {
					onFrame.pub(frame)
				},
			}),
		})

		return new this<F>(thread, onFrame)
	}
}

