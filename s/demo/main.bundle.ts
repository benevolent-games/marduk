
import {$} from "@e280/sly"
import {CubeDemo} from "./demos/cube/view.js"
import {DemoHarness} from "./harness/view.js"

$.render($(".app"), DemoHarness(
	["cube", CubeDemo],
))

console.log("👁️ marduk")

