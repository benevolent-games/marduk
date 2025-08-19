
import {$} from "@e280/sly"
import {DemoHarness} from "./harness/view.js"

$.render($(".app"), DemoHarness(
	["nothing", async() => (await import("./demos/nothing/demo.js")).default()],
	["cube", async() => (await import("./demos/cube/demo.js")).default()],
))

console.log("👁️ marduk")

