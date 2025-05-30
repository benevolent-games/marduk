
import {html, shadowComponent} from "@benev/slate"
import styleCss from "./style.css.js"
import {Thunder} from "../../thunder.js"
import {Visualizer} from "../../parts/visualizer.js"

export const thunderElement = (thunder: Thunder) => shadowComponent(use => {
	use.styles(styleCss)

	const visualizer = use.init(() => {
		const visualizer = new Visualizer(thunder)
		return [visualizer, visualizer.dispose]
	})

	use.deferOnce(() => {
		visualizer.rezzer.recalibrate()
	})

	return html`
		${visualizer.canvas}
	`
})

