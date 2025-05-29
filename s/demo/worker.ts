
import {Thunder} from "../thunder/thunder.js"

console.log("worker")

await Thunder.setupWorker(async imagination => {
	return {
		create(id) { console.log("create", id) },
		update(id) { console.log("update", id) },
		delete(id) { console.log("delete", id) },
	}
})

