
import {Sub} from "@e280/stz"
import {Spawn} from "../../tools/lifecycler.js"
import {CanvasDetails, FigmentId, FigmentSpec, FigmentTuple, Frame} from "./types.js"

export type Backstage<Fs extends FigmentSpec> = {
	canvas: OffscreenCanvas
	onFrame: Sub<[Frame]>
	spawn: Spawn<FigmentId, FigmentTuple<Fs, keyof Fs>>
	updateCanvas: (details: CanvasDetails) => void
}

