
import {register} from "@benev/slate"
import {DemoFigmentSpec} from "./spec.js"
import {theaterHost} from "../theater/theater.js"
import {theaterElement} from "../theater/element/element.js"

void async function() {
	const theater = await theaterHost<DemoFigmentSpec>({
		workerUrl: new URL("./worker.bundle.js", import.meta.url)
	})

	// test full lifecycle
	await theater.thread.work.setFigments([[0, ["hippo", {hungry: false}]]])
	await theater.thread.work.setFigments([[0, ["hippo", {hungry: true}]]])
	await theater.thread.work.setFigments([[0, undefined]])

	register({MardukTheater: theaterElement(theater)})

	console.log("👁️")
}()

