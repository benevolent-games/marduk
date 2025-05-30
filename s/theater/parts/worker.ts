
import {Comrade, tune} from "@e280/comrade"
import {Backstage} from "./backstage.js"
import {LifecycleFns, Lifecycler} from "../../tools/lifecycler.js"
import {FigmentId, FigmentSpec, FigmentTupleAny, TheaterSchematic} from "./types.js"

export async function theaterWorker<Fs extends FigmentSpec>(
		establish: (backstage: Backstage) => Promise<LifecycleFns<FigmentId, FigmentTupleAny<Fs>>>,
	) {

	const backstage = await Backstage.make()
	const fns = await establish(backstage)
	const lifecycler = new Lifecycler<FigmentId, FigmentTupleAny<Fs>>(fns)

	const host = await Comrade.worker<TheaterSchematic<Fs>>(() => ({
		async setCanvasDetails(details) {
			backstage.updateCanvas(details)
		},
		async setFigments(entries) {
			for (const [id, tuple] of entries)
				lifecycler.sync(id, tuple)
		},
	}))

	backstage.onFrame(async(count, bitmap) => {
		await host.deliverFrame[tune]({transfer: [bitmap]})({count, bitmap})
	})

	backstage.gameloop.start()
}

