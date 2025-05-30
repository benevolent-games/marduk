
import {thunderWorker} from "../thunder/parts/worker.js"

thunderWorker(async imagination => {
	imagination.scene
	return {
		create(id) { console.log("create", id) },
		update(id) { console.log("update", id) },
		delete(id) { console.log("delete", id) },
	}
})

