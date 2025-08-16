
import {css} from "lit"
import {nap} from "@e280/stz"
import {cssReset, view} from "@e280/sly"

import {Demo} from "../../harness/view.js"
import {CanvasRezzer} from "../../../wip/babylon/iron/canvas-rezzer.js"

export const cubeDemo: Demo = ["cube", async() => {
	await nap(1000)

	return view(use => () => {
		use.styles(cssReset, stylesCss)

		const canvas = use.life(() => {
			const canvas = document.createElement("canvas")
			const rezzer = new CanvasRezzer(canvas)
			return [canvas, () => rezzer.dispose()]
		})

		return canvas
	})
}]

const stylesCss = css`
	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
`

