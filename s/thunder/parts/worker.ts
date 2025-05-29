
import {Comrade, tune} from "@e280/comrade"
import {Imagination} from "./imagination.js"
import {LifecycleFns, Lifecycler} from "../../tools/lifecycler.js"
import {FigmentId, FigmentSpec, FigmentTupleAny, ThunderSchematic} from "./types.js"

export async function setupThunderWorker<Fs extends FigmentSpec>(
		establish: (imagination: Imagination) => LifecycleFns<FigmentId, FigmentTupleAny<Fs>>,
	) {

	const imagination = await Imagination.make()
	const fns = establish(imagination)
	const lifecycler = new Lifecycler<FigmentId, FigmentTupleAny<Fs>>(fns)

	const host = await Comrade.worker<ThunderSchematic<Fs>>(() => ({
		async updateCanvas(details) {
			imagination.updateCanvas(details)
		},
		async updateFigments(entries) {
			for (const [id, tuple] of entries)
				lifecycler.sync(id, tuple)
		},
	}))

	imagination.onFrame(async(frame, bitmap) => {
		await host.deliverFrame[tune]({transfer: [bitmap]})(frame, bitmap)
	})

	imagination.gameloop.start()
}

