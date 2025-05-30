
import {register} from "@benev/slate"
import {DemoFigmentSpec} from "./spec.js"
import {Thunder} from "../thunder/thunder.js"
import {thunderElement} from "../thunder/elements/marduk-thunder/element.js"

void async function() {
	console.log("starting thunder!")
	const thunder = await Thunder.setupHost<DemoFigmentSpec>({
		workerUrl: new URL("./worker.js", import.meta.url)
	})
	console.log("thunder ready")

	thunder.thread.work.updateFigments([[0, ["hippo", {hungry: false}]]])

	register({
		MardukThunder: thunderElement(thunder),
	})

	console.log("👁️")
}()

