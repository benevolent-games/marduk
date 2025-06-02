
import {Sub} from "@e280/stz"
import {Vec2Array} from "@benev/math"
import {AsSchematic} from "@e280/comrade"

import {Spawn} from "../../tools/lifecycler.js"
import {FigmentId, FigmentSpec, FigmentSync, FigmentTuple} from "../pure/types.js"

export type CanvasDetails = {
	dimensions: Vec2Array
}

export type Backstage<Fs extends FigmentSpec> = {
	canvas: OffscreenCanvas
	onFrame: Sub<[Frame]>
	spawn: Spawn<FigmentId, FigmentTuple<Fs, keyof Fs>>
	updateCanvas: (details: CanvasDetails) => void
}

export function asBackstage<Bs extends Backstage<any>>(bs: Bs): Bs {
	return bs
}

export type TheaterSchematic<Fs extends FigmentSpec> = AsSchematic<{

	// functions on the worker. main thread can call these.
	work: {
		syncFigments(figments: FigmentSync<Fs>): Promise<void>
		setCanvasDetails(details: CanvasDetails): Promise<void>
	}

	// functions on main thread. workers can call these.
	host: {
		deliverFrame(frame: Frame): Promise<void>
	}
}>

export type Frame = {
	count: number
	bitmap: ImageBitmap
}

