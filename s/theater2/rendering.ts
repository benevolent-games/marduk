
import {Remote} from "@e280/renraku"
import {AsSchematic, Comrade, SetupWork, Thread, ThreadOptions, WorkerOpts} from "@e280/comrade"

export type Id = number
export type Fig<Data = any> = [Id, Data]

export type RenderingSchematic<State, Payload, Result> = AsSchematic<{

	// functions on the worker. main thread can call these.
	work: {
		set: (state: State) => Promise<void>
		supply: (payload: Payload) => Promise<void>
	}

	// functions on main thread. worker can call these.
	host: {
		deliver: (result: Result) => Promise<void>
	}
}>

export async function renderingWorker<State, Payload, Result>(
		setupWork: SetupWork<RenderingSchematic<State, Payload, Result>>,
		opts?: WorkerOpts,
	): Promise<Remote<RenderingSchematic<State, Payload, Result>>["host"]> {
	return Comrade.worker<RenderingSchematic<State, Payload, Result>>(setupWork, opts)
}

export async function renderingThread<State, Payload, Result>(
		options: ThreadOptions<RenderingSchematic<State, Payload, Result>>,
	): Promise<Thread<RenderingSchematic<State, Payload, Result>>> {
	return Comrade.thread<RenderingSchematic<State, Payload, Result>>(options)
}

