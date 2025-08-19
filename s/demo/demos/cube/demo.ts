
import {css} from "lit"
import {nap} from "@e280/stz"
import {cssReset, view} from "@e280/sly"

import {Mk} from "../../../mk/mk.js"
import {Demo} from "../../harness/view.js"

export const cubeDemo: Demo = ["cube", async() => {
	await nap(2000)

	const mk = new Mk()
	const canvas = mk.canvas()
	mk.autoscaler(canvas)
	mk.pointerlocker(canvas, {unadjustedMovement: true})
	const engine = await mk.engine({canvas, webgl: {}})
	const scene = mk.scene({engine})
	scene.render()

	return view(use => () => {
		use.styles(cssReset, stylesCss)
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

