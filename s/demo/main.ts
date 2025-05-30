
import {register} from "@benev/slate"
import {DemoFigmentSpec} from "./spec.js"
import {Thunder} from "../thunder/thunder.js"
import {thunderElement} from "../thunder/elements/marduk-thunder/element.js"

void async function() {
	const thunder = await Thunder.host<DemoFigmentSpec>({
		workerUrl: new URL("./worker.bundle.js", import.meta.url)
	})

	// test full lifecycle
	await thunder.thread.work.setFigments([[0, ["hippo", {hungry: false}]]])
	await thunder.thread.work.setFigments([[0, ["hippo", {hungry: true}]]])
	await thunder.thread.work.setFigments([[0, undefined]])

	register({MardukThunder: thunderElement(thunder)})

	console.log("👁️")
}()

