
import {html, shadowComponent} from "@benev/slate"
import styleCss from "./style.css.js"
import {Thunder} from "../../thunder.js"
import {Iron} from "../../../iron/iron.js"

export const thunderElement = (thunder: Thunder) => shadowComponent(use => {
	use.styles(styleCss)

	const {canvas} = use.once(() => {
		const canvas = document.createElement("canvas")
		const rezzer = Iron.canvasRezzer(canvas, () => 1)

		thunder.thread.work.updateCanvas({
			resolution: 1,
			dimensions: [canvas.width, canvas.height],
		})

		return {canvas, rezzer}
	})

	return html`
		${canvas}
	`
})

