
import {css} from "lit"
import {cssReset, view} from "@e280/sly"

export function makeLilCanvasView(canvas: HTMLCanvasElement, afterFirstRender = () => {}) {
	return view(use => () => {
		use.styles(cssReset, stylesCss)
		use.mount(() => {
			use.rendered.then(afterFirstRender)
			return () => {}
		})
		return canvas
	})
}

const stylesCss = css`
	:host {
		position: relative;
	}

	canvas {
		display: block;
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}
`

