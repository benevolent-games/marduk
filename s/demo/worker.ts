
import {theaterWorker} from "../theater/parts/worker.js"

theaterWorker(async backstage => {
	backstage.scene
	return {
		create(id) { console.log("create", id) },
		update(id) { console.log("update", id) },
		delete(id) { console.log("delete", id) },
	}
})

