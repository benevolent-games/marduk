
import {Science} from "@e280/science"
import buckets from "./buckets/buckets.test.js"
import nametag from "./nametag/nametag.test.js"

await Science.run({
	buckets,
	nametag,
})

