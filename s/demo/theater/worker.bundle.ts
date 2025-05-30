
import {DemoFigmentSpec} from "./spec.js"
import {theaterWorker} from "../../theater/theater-worker.js"
import {babylonBackstage} from "../../theater/babylon-backstage.js"

const backstage = await babylonBackstage<DemoFigmentSpec>(async stagecraft => {
	stagecraft.gameloop.start()
	return {
		hippo: (id, data) => {
			console.log("spawn", id, data)
			return {
				update: data => console.log("update", id, data),
				dispose: () => console.log("dispose", id, data),
			}
		},
	}
})

theaterWorker(backstage)

