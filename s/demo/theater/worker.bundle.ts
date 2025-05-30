
import {DemoFigmentSpec} from "./spec.js"
import {theaterWorker} from "../../theater/theater-worker.js"
import {babylonBackstage} from "../../theater/babylon-backstage.js"

const backstage = await babylonBackstage<DemoFigmentSpec>(async stagecraft => {
	stagecraft.gameloop.start()
	return {
		lifecycle: {
			create(id) { console.log("create", id) },
			update(id) { console.log("update", id) },
			delete(id) { console.log("delete", id) },
		},
	}
})

theaterWorker(backstage)

