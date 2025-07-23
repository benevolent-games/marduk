
import {MapG} from "@e280/stz"
import {Lifecycler} from "../../tools/lifecycler.js"

export type Id = number

export type Figs = {[kind: string]: any}
export type AsFigs<Fs extends Figs> = Fs

export type Figlife<Data> = {
	update(data: Data): void
	tick(data: Data): void
	dispose(): void
}

export type FigFn<Data> = (data: Data, id: number) => Figlife<Data>

export type FigSpawners<Fs extends Figs> = {[K in keyof Fs]: FigFn<Fs[K]>}

export type FigTuple<Fs extends Figs, K extends keyof Fs = keyof Fs> = [K, Fs[K]]
export type FigEntry<Fs extends Figs> = [Id, FigTuple<Fs>]
export type FigSyncs<Fs extends Figs> = [id: Id, tuple: undefined | FigTuple<Fs>][]

export type FigPod<Fs extends Figs, K extends keyof Fs = keyof Fs> = {
	id: Id
	kind: K
	data: Fs[K]
	tick: (data: Fs[K]) => void
}

export class Figcycler<Fs extends Figs> {
	#pods = new MapG<Id, FigPod<Fs>>()
	#lifecycler: Lifecycler<Id, FigTuple<Fs>>

	constructor(spawners: FigSpawners<Fs>) {
		this.#lifecycler = new Lifecycler<Id, FigTuple<Fs>>((id, [kind, data]) => {
			const life = spawners[kind](data, id)
			const pod: FigPod<Fs> = {id, kind, data, tick: life.tick}
			this.#pods.set(id, pod)
			return {
				update: ([,data]) => {
					pod.data = data
					life.update(data)
				},
				dispose: () => {
					this.#pods.delete(id)
					life.dispose()
				},
			}
		})
	}

	sync(syncs: FigSyncs<Fs>) {
		for (const [id, tuple] of syncs)
			this.#lifecycler.sync(id, tuple)
	}

	tick() {
		for (const pod of this.#pods.values())
			pod.tick(pod.data)
	}
}

