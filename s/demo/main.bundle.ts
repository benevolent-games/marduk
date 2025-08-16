
import {$} from "@e280/sly"
import {cubeDemo} from "./demos/cube/demo.js"
import {DemoHarness} from "./harness/view.js"
import {nothingDemo} from "./demos/nothing/demo.js"

$.render($(".app"), DemoHarness(
	nothingDemo,
	cubeDemo,
))

console.log("👁️ marduk")

