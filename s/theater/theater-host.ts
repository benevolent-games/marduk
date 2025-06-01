
import {sub} from "@e280/stz"
import {Comrade} from "@e280/comrade"
import {FigmentSpec, Frame, Theater, TheaterHostOptions, TheaterSchematic} from "./parts/types.js"

export async function theaterHost<Fs extends FigmentSpec>(
		options: TheaterHostOptions
	): Promise<Theater<Fs>> {

	const onFrame = sub<[frame: Frame]>()
	const thread = await Comrade.thread<TheaterSchematic<Fs>>({
		label: "theater",
		workerUrl: options.workerUrl,
		timeout: 1_000,
		setupHost: () => ({
			deliverFrame: async frame => {
				onFrame.pub(frame)
			},
		}),
	})
	const backstage = thread.work
	return {thread, backstage, onFrame}
}

