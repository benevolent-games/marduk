
import {DemoFigmentSpec} from "./spec.js"
import {Frontstage} from "../../theater/index.dom.js"

export async function demoFrontstage() {
	const hash = document.head.querySelector("[data-commit-hash]")!.getAttribute("data-commit-hash")

	const workerUrl = new URL(`./back.worker.bundle.js?v=${hash}`, import.meta.url)
	const frontstage = await Frontstage.make<DemoFigmentSpec>({workerUrl})

	// test full lifecycle
	await frontstage.syncFigments([[0, ["hippo", {hungry: false}]]])
	await frontstage.syncFigments([[0, ["hippo", {hungry: true}]]])
	await frontstage.syncFigments([[0, undefined]])

	return frontstage
}

