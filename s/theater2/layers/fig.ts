
import {Life, Lifecycler} from "../../tools/lifecycler.js"

export type Id = number

export type Figs = {[kind: string]: any}
export type AsFigs<Fs extends Figs> = Fs

export type FigFn<Data> = (data: Data, id: number) => Life<Data>
export type FigSpawners<Fs extends Figs> = {[K in keyof Fs]: FigFn<Fs[K]>}

export type FigTuple<Fs extends Figs, K extends keyof Fs = keyof Fs> = [K, Fs[K]]
export type FigEntry<Fs extends Figs> = [Id, FigTuple<Fs>]
export type FigSyncs<Fs extends Figs> = [id: Id, tuple: undefined | FigTuple<Fs>][]

export class Figcycler<Fs extends Figs> {
	#lifecycler: Lifecycler<Id, FigTuple<Fs>>

	constructor(spawners: FigSpawners<Fs>) {
		this.#lifecycler = new Lifecycler<Id, FigTuple<Fs>>((id, [kind, data]) => {
			const life = spawners[kind](data, id)
			return {
				update: ([,data]) => life.update(data),
				dispose: () => life.dispose(),
			}
		})
	}

	sync(syncs: FigSyncs<Fs>) {
		for (const [id, tuple] of syncs)
			this.#lifecycler.sync(id, tuple)
	}
}

