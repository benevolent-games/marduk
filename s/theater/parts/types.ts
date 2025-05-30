
import {Vec2Array} from "@benev/math"
import {AsSchematic} from "@e280/comrade"

export type TheaterSchematic<Fs extends FigmentSpec> = AsSchematic<{

	// functions on the worker. main thread can call these.
	work: {
		setFigments(figments: FigmentSync<Fs>): Promise<void>
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

export type FigmentSpec = {[kind: string]: any}
export type AsFigmentSpec<Fs extends FigmentSpec> = Fs

export type FigmentLifecycle<Kind, Data> = {
	create: (id: FigmentId, kind: Kind, data: Data) => void
	update: (id: FigmentId, kind: Kind, data: Data) => void
	delete: (id: FigmentId, kind: Kind) => void
}

export type CanvasDetails = {
	dimensions: Vec2Array
}

export type FigmentId = number
export type FigmentEntry<Kind, Data> = [id: FigmentId, tuple: FigmentTuple<Kind, Data>]
export type FigmentEntries<Fs extends FigmentSpec> = FigmentEntry<keyof Fs, Fs[keyof Fs]>[]
export type FigmentSync<Fs extends FigmentSpec> = [id: FigmentId, tuple: FigmentTupleAny<Fs> | undefined][]
export type FigmentTuple<Kind, Data> = [kind: Kind, data: Data]
export type FigmentData<Fs extends FigmentSpec> = Fs[keyof Fs]
export type FigmentTupleAny<Fs extends FigmentSpec> = FigmentTuple<keyof Fs, Fs[keyof Fs]>

