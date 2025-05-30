
import {html, shadowComponent} from "@benev/slate"
import styleCss from "./style.css.js"
import {Thunder} from "../../thunder.js"
import {CanvasRezzer} from "../../../iron/parts/canvas-rezzer.js"

export const thunderElement = (thunder: Thunder) => shadowComponent(use => {
	use.styles(styleCss)

	const {canvas} = use.once(() => {
		const canvas = document.createElement("canvas")
		const rezzer = new CanvasRezzer(canvas, () => 1)

		thunder.thread.work.setCanvasDetails({
			resolution: 1,
			dimensions: [canvas.width, canvas.height],
		})

		return {canvas, rezzer}
	})

	return html`
		${canvas}
	`
})

