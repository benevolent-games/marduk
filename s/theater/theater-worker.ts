
import {Comrade, tune} from "@e280/comrade"
import {Backstage} from "./parts/backstage.js"
import {Lifecycler} from "../tools/lifecycler.js"
import {FigmentId, FigmentSpec, FigmentTuple, TheaterSchematic} from "./parts/types.js"

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
		async setFigments(entries) {
			for (const [id, tuple] of entries)
				lifecycler.sync(id, tuple)
		},
	}))

	backstage.onFrame(async(frame) => {
		await host.deliverFrame[tune]({transfer: [frame.bitmap]})(frame)
	})
}

