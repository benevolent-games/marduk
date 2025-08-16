
import {css, render, shadowView} from "@benev/slate"
import {Demo} from "../types.js"
import commonCss from "../common.css.js"
import {CanvasRezzer} from "../../../wip/babylon/iron/canvas-rezzer.js"

export default <Demo>(async options => {
	console.log("mount")
	const canvas = document.createElement("canvas")
	const rezzer = new CanvasRezzer(canvas)

	const styleCss = css`
		canvas {
			display: block;
			width: 100%;
			height: 100%;
			background: #000;
		}
	`

	const DemoView = shadowView(use => () => {
		use.styles(commonCss, styleCss)
		return canvas
	})

	render(DemoView, options.plate)

	return async() => {
		console.log("unmount")
		rezzer.dispose()
	}
})

