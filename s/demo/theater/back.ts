
import {DemoFigmentSpec} from "./spec.js"
import {theaterWorker} from "../../theater/theater-worker.js"
import {babylonBackstage} from "../../theater/babylon-backstage.js"

theaterWorker(
	await babylonBackstage<DemoFigmentSpec>(async _stagecraft => ({
		hippo: (id, data) => {
			console.log("spawn", id, data)
			return {
				update: data => console.log("update", id, data),
				dispose: () => console.log("dispose", id, data),
			}
		},
	}))
)

