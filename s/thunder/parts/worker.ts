
import {Comrade, tune} from "@e280/comrade"
import {Imagination} from "./imagination.js"
import {LifecycleFns, Lifecycler} from "../../tools/lifecycler.js"
import {FigmentId, FigmentSpec, FigmentTupleAny, ThunderSchematic} from "./types.js"

export async function thunderWorker<Fs extends FigmentSpec>(
		establish: (imagination: Imagination) => Promise<LifecycleFns<FigmentId, FigmentTupleAny<Fs>>>,
	) {

	const imagination = await Imagination.make()
	const fns = await establish(imagination)
	const lifecycler = new Lifecycler<FigmentId, FigmentTupleAny<Fs>>(fns)

	const host = await Comrade.worker<ThunderSchematic<Fs>>(() => ({
		async setCanvasDetails(details) {
			imagination.updateCanvas(details)
		},
		async setFigments(entries) {
			for (const [id, tuple] of entries)
				lifecycler.sync(id, tuple)
		},
	}))

	imagination.onFrame(async(count, bitmap) => {
		await host.deliverFrame[tune]({transfer: [bitmap]})({count, bitmap})
	})

	imagination.gameloop.start()
}

