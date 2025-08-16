
import {$} from "@e280/sly"
import {CubeDemo} from "./demos/cube/view.js"
import {DemoHarness} from "./harness/view.js"
import {NothingDemo} from "./demos/nothing/view.js"

$.render($(".app"), DemoHarness(
	["nothing", NothingDemo],
	["cube", CubeDemo],
))

console.log("👁️ marduk")

