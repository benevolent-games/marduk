
import {DemoFigmentSpec} from "./spec.js"
import {theaterHost} from "../../theater/theater-host.js"
import {Frontstage} from "../../theater/parts/frontstage.js"

export async function demoFrontstage() {
	const hash = document.head.querySelector("[data-commit-hash]")!.getAttribute("data-commit-hash")

	const theater = await theaterHost<DemoFigmentSpec>({
		workerUrl: new URL(`./worker.bundle.esbuild.js?v=${hash}`, import.meta.url)
	})

	// test full lifecycle
	await theater.thread.work.setFigments([[0, ["hippo", {hungry: false}]]])
	await theater.thread.work.setFigments([[0, ["hippo", {hungry: true}]]])
	await theater.thread.work.setFigments([[0, undefined]])

	return new Frontstage(theater)
}

