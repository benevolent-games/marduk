
import {Remote} from "@e280/renraku"
import {AsSchematic, Comrade, SetupWork, Thread, ThreadOptions, WorkerOpts} from "@e280/comrade"

export type RenderingSchematic<Payload, Result> = AsSchematic<{
	work: {
		supply: (payload: Payload) => Promise<void>
	}
	host: {
		deliver: (result: Result) => Promise<void>
	}
}>

export async function renderingWorker<Payload, Result>(
		setupWork: SetupWork<RenderingSchematic<Payload, Result>>,
		opts?: WorkerOpts,
	): Promise<Remote<RenderingSchematic<Payload, Result>>["host"]> {
	return Comrade.worker<RenderingSchematic<Payload, Result>>(setupWork, opts)
}

export async function renderingThread<Payload, Result>(
		options: ThreadOptions<RenderingSchematic<Payload, Result>>,
	): Promise<Thread<RenderingSchematic<Payload, Result>>> {
	return Comrade.thread<RenderingSchematic<Payload, Result>>(options)
}

