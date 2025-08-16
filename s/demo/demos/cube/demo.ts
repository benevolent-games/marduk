
import {css} from "lit"
import {cssReset, view} from "@e280/sly"
import {CanvasRezzer} from "../../../wip/babylon/iron/canvas-rezzer.js"

export default view(use => () => {
	use.styles(cssReset, stylesCss)

	const canvas = use.life(() => {
		const canvas = document.createElement("canvas")
		const rezzer = new CanvasRezzer(canvas)
		return [canvas, () => rezzer.dispose()]
	})

	return canvas
})

const stylesCss = css`
	canvas {
		display: block;
		width: 100%;
		height: 100%;
		background: #000;
	}
`

