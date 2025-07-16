
import {DemoFigmentSpec} from "./spec.js"
import {Frontstage} from "../../theater/index.dom.js"

const url = "/demo/theater/back.worker.bundle.min.js"

export async function demoFrontstage() {
	const version = document.head.querySelector("[data-version]")!.getAttribute("data-version")
	const workerUrl = new URL(`${url}?v=${version}`, import.meta.url)
	console.log(workerUrl.href)
	const frontstage = await Frontstage.make<DemoFigmentSpec>({workerUrl})

	// test full lifecycle
	await frontstage.syncFigments([[0, ["hippo", {hungry: false}]]])
	await frontstage.syncFigments([[0, ["hippo", {hungry: true}]]])
	await frontstage.syncFigments([[0, undefined]])

	return frontstage
}

