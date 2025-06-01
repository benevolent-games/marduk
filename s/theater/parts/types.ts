
import {Sub} from "@e280/stz"
import {Remote} from "@e280/renraku"
import {Vec2Array} from "@benev/math"
import {Spawn} from "../../tools/lifecycler.js"
import {AsSchematic, Comrade} from "@e280/comrade"

export type TheaterHostOptions = {
	workerUrl: URL | string
}

export type Theater<Fs extends FigmentSpec = any> = {
	onFrame: Sub<[frame: Frame]>
	thread: Comrade.Thread<TheaterSchematic<Fs>>
	backstage: Remote<TheaterSchematic<Fs>["work"]>
}

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
export type FigmentEntry<Kind, Data> = [id: FigmentId, tuple: [Kind, Data]]
export type FigmentEntries<Fs extends FigmentSpec> = FigmentEntry<keyof Fs, Fs[keyof Fs]>[]
export type FigmentSync<Fs extends FigmentSpec> = [id: FigmentId, tuple: FigmentTuple<Fs> | undefined][]
export type FigmentData<Fs extends FigmentSpec> = Fs[keyof Fs]
export type FigmentTuple<Fs extends FigmentSpec, K extends keyof Fs = keyof Fs> = [K, Fs[K]]

export type FigmentSpawners<Fs extends FigmentSpec> = {
	[Kind in keyof Fs]: Spawn<FigmentId, Fs[Kind]>
}

