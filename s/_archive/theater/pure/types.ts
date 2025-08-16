
import {Spawn} from "../../../tools/lifecycler.js"

export type FigmentSpec = {[kind: string]: any}
export type AsFigmentSpec<Fs extends FigmentSpec> = Fs

export type FigmentLifecycle<Kind, Data> = {
	create: (id: FigmentId, kind: Kind, data: Data) => void
	update: (id: FigmentId, kind: Kind, data: Data) => void
	delete: (id: FigmentId, kind: Kind) => void
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

