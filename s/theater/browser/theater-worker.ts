
import {Comrade, tune} from "@e280/comrade"
import {Lifecycler} from "../../tools/lifecycler.js"
import {Backstage, TheaterSchematic} from "./types.js"
import {FigmentId, FigmentSpec, FigmentTuple} from "../pure/types.js"

export async function theaterWorker<Fs extends FigmentSpec>(
		backstage: Backstage<Fs>
	) {

	const lifecycler = new Lifecycler<FigmentId, FigmentTuple<Fs>>(
		backstage.spawn
	)

	const host = await Comrade.worker<TheaterSchematic<Fs>>(() => ({
		async setCanvasDetails(details) {
			backstage.updateCanvas(details)
		},
		async syncFigments(entries) {
			for (const [id, tuple] of entries)
				lifecycler.sync(id, tuple)
		},
	}))

	backstage.onFrame(async(frame) => {
		await host.deliverFrame[tune]({transfer: [frame.bitmap]})(frame)
	})
}

