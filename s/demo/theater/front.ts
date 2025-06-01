
import {DemoFigmentSpec} from "./spec.js"
import {theaterHost} from "../../theater/theater-host.js"
import {Frontstage} from "../../theater/parts/frontstage.js"

export async function demoFrontstage() {
	const hash = document.head.querySelector("[data-commit-hash]")!.getAttribute("data-commit-hash")

	const workerUrl = new URL(`./back.worker.bundle.js?v=${hash}`, import.meta.url)
	const theater = await theaterHost<DemoFigmentSpec>({workerUrl})
	const frontstage = new Frontstage(theater)

	// test full lifecycle
	await theater.backstage.setFigments([[0, ["hippo", {hungry: false}]]])
	await theater.backstage.setFigments([[0, ["hippo", {hungry: true}]]])
	await theater.backstage.setFigments([[0, undefined]])

	return frontstage
}

