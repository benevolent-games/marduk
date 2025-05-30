
import {Sub} from "@e280/stz"
import {Lifecycle} from "../../tools/lifecycler.js"
import {CanvasDetails, FigmentId, FigmentSpec, FigmentTupleAny, Frame} from "./types.js"

export type Backstage<Fs extends FigmentSpec> = {
	canvas: OffscreenCanvas
	onFrame: Sub<[Frame]>
	lifecycle: Lifecycle<FigmentId, FigmentTupleAny<Fs>>
	updateCanvas: (details: CanvasDetails) => void
}

